import {Company} from "../../../domain/entities/company.entity";
import {Injectable} from "@nestjs/common";
import {CompanyRepositoryPort} from "../../../domain/ports/company.repository.port";


@Injectable()
export class InMemoryCompanyRepository implements CompanyRepositoryPort {
    private companies: Map<string, Company> = new Map();

    async findByTaxId(taxId: string): Promise<Company | null> {
        const normalized = taxId.replace(/\D/g, "");
        for (const company of this.companies.values()) {
            if ((company.taxId ?? "").replace(/\D/g, "") === normalized) {
                return company;
            }
        }
        return null;
    }

    findByIds(ids: string[]): Promise<Company[]> {
        throw new Error("Method not implemented.");
    }

    async save(company: Company): Promise<void> {
        this.companies.set(company.id, company);
    }
}