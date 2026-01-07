import {Company} from "../../../domain/entities/company.entity";
import {Injectable} from "@nestjs/common";
import {CompanyRepositoryPort} from "../../../domain/ports/company.repository.port";


@Injectable()
export class InMemoryCompanyRepository implements CompanyRepositoryPort {
    private companies: Map<string, Company> = new Map();

    findByTaxId(taxId: string): Promise<Company | null> {
        throw new Error("Method not implemented.");
    }

    findByIds(ids: string[]): Promise<Company[]> {
        throw new Error("Method not implemented.");
    }

    async save(company: Company): Promise<void> {
        this.companies.set(company.id, company);
    }
}