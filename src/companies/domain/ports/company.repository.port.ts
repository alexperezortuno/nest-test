import {Company} from "../entities/company.entity";
import {Pyme} from "../entities/pyme.entity";

export interface CompanyRepositoryPort {
    findByTaxId(taxId: string): Promise<Company | null>;

    save(company: Company | Pyme): Promise<void>;

    findByIds(ids: string[]): Promise<Company[]>;
}