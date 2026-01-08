import {Company} from "../entities/company.entity";
import {Pyme} from "../entities/pyme.entity";
import {Corporate} from "../entities/corporate.entity";

export interface CompanyRepositoryPort {
    create(company: Company | Pyme): Promise<void>;

    findByTaxId(taxId: string): Promise<Company | null>;

    findAllPymes(): Promise<Pyme[]>;

    findAllCorporates(): Promise<Corporate[]>;

    exists(taxId: string): Promise<boolean>;

    update(company: Corporate | Pyme): Promise<Corporate | Pyme>;

    delete(id: string): Promise<boolean>;
}