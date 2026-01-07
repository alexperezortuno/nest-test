import {Company, Status} from "./company.entity";
import {CompanyType} from "../value-objects/company-type.vo";
import {DomainException} from "../exceptions/domain.exception";

export class Corporate extends Company {
    private readonly MIN_CAPITAL = 1000000;

    constructor(
        id: string,
        name: string,
        taxId: string,
        email: string,
        phone: string,
        status: Status,
        address: string,
        locationId: string,
        public readonly capital: number
    ) {
        super(id, name, taxId, email, phone, CompanyType.CORPORATE, status, address, locationId);
    }

    validateAdhesion(): void {
        if (this.capital < this.MIN_CAPITAL) {
            throw new DomainException(
                `corporate capital must be at least ${this.MIN_CAPITAL}`
            );
        }
    }
}