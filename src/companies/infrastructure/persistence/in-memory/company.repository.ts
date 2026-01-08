import {Company} from "../../../domain/entities/company.entity";
import {Injectable} from "@nestjs/common";
import {CompanyRepositoryPort} from "../../../domain/ports/company.repository.port";
import {Pyme} from "../../../domain/entities/pyme.entity";
import {Corporate} from "../../../domain/entities/corporate.entity";
import {response} from "express";


@Injectable()
export class InMemoryCompanyRepository implements CompanyRepositoryPort {
    private companies: Map<string, Company> = new Map();

    async findByTaxId(taxId: string): Promise<Company | null> {
        for (const company of this.companies.values()) {
            if (company.taxId === taxId) {
                return company;
            }
        }
        return null;
    }

    async create(company: Company): Promise<void> {
        this.companies.set(company.id, company);
    }

    async findAllPymes(): Promise<Pyme[]> {
        return Array.from(this.companies.values()).filter(company => company instanceof Pyme);
    }

    async findAllCorporates(): Promise<Corporate[]> {
        return Array.from(this.companies.values()).filter(company => company instanceof Corporate);
    }

    async delete(taxId: string): Promise<boolean> {
        let c: Company = Array.from(this.companies.values()).find(
            company => company.taxId === taxId
        );
        this.companies.delete(c.id);
        return true;
    }

    async update(company: Corporate | Pyme): Promise<Corporate | Pyme> {
        this.companies.set(company.id, company);
        return company;
    }

    async exists(taxId: string): Promise<boolean> {
        if (!taxId) return false;
        return Array.from(this.companies.values()).some(
            company => company.taxId === taxId
        );
    }
}