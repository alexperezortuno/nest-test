import {Company} from "../../../domain/entities/company.entity";
import {Injectable} from "@nestjs/common";
import {CompanyRepositoryPort} from "../../../domain/ports/company.repository.port";
import {Pyme} from "../../../domain/entities/pyme.entity";
import {Corporate} from "../../../domain/entities/corporate.entity";


@Injectable()
export class InMemoryCompanyRepository implements CompanyRepositoryPort {
    private companies: Map<string, Company> = new Map();

    async create(company: Corporate | Pyme): Promise<void> {
        this.companies.set(company.id, company);
    }

    async findByTaxId(taxId: string): Promise<Company | null> {
        for (const company of this.companies.values()) {
            if (company.taxId === taxId) {
                return company;
            }
        }
        return null;
    }

    async findByTaxIds(taxIds: string[]): Promise<Company[]> {
        return Array.from(this.companies.values()).filter(company => taxIds.includes(company.taxId));
    }

    async findAllPymes(): Promise<Pyme[]> {
        return Array.from(this.companies.values()).filter(company => company instanceof Pyme);
    }

    async findAllCorporates(): Promise<Corporate[]> {
        return Array.from(this.companies.values()).filter(company => company instanceof Corporate);
    }

    async exists(taxId: string): Promise<boolean> {
        if (!taxId) return false;
        return Array.from(this.companies.values()).some(
            company => company.taxId === taxId
        );
    }

    async update(company: Corporate | Pyme): Promise<Corporate | Pyme> {
        this.companies.set(company.id, company);
        return company;
    }

    async delete(taxId: string): Promise<boolean> {
        let c: Company = Array.from(this.companies.values()).find(
            company => company.taxId === taxId
        );
        this.companies.delete(c.id);
        return true;
    }
}