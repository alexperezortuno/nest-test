import {Company} from "./company.entity";
import {CompanyType} from "../value-objects/company-type.vo";
import {DomainException} from "../exceptions/domain.exception";
import {StatusType} from "../value-objects/status-type.vo";
import {LocationId} from "../value-objects/location-id.vo";

export class Pyme extends Company {
    private readonly MAX_EMPLOYEES = 50;

    constructor(
        id: string,
        name: string,
        taxId: string,
        email: string,
        phone: string,
        address: string,
        locationId: LocationId,
        public readonly employeesCount: number,
        status?: StatusType
    ) {
        if (!status) status = StatusType.PENDING;
        super(id, name, taxId, email, phone, address, locationId, CompanyType.PYME, status);
    }

    validateAdhesion(): void {
        if (this.employeesCount > this.MAX_EMPLOYEES) {
            throw new DomainException(
                `PYME cannot have more than ${this.MAX_EMPLOYEES} employees`
            );
        }
    }
}