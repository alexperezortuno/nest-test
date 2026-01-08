import {Company} from "./company.entity";
import {CompanyType} from "../value-objects/company-type.vo";
import {DomainException} from "../exceptions/domain.exception";
import {StatusType} from "../value-objects/status-type.vo";
import {LocationId} from "../value-objects/location-id.vo";



export class Corporate extends Company {
    private readonly MIN_CAPITAL = 1000000;

    constructor(
        id: string,
        name: string,
        taxId: string,
        email: string,
        phone: string,
        address: string,
        locationId: LocationId,
        public readonly capital: number,
        status?: StatusType
    ) {
        if (!status) status = StatusType.APPROVED;
        super(id, name, taxId, email, phone, address, locationId, CompanyType.CORPORATE, status);
    }

    validateAdhesion(): void {
        if (this.capital < this.MIN_CAPITAL) {
            throw new DomainException(
                `corporate capital must be at least ${this.MIN_CAPITAL}`
            );
        }
    }
}