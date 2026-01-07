import {Company, Status} from "./company.entity";
import {CompanyType} from "../value-objects/company-type.vo";
import {DomainException} from "../exceptions/domain.exception";

export class Pyme extends Company {
    private readonly MAX_EMPLOYEES = 50;

    constructor(
        id: string,
        name: string,
        taxId: string,
        email: string,
        phone: string,
        status: Status,
        address: string,
        locationId: string,
        public readonly employeesCount: number
    ) {
        super(id, name, taxId, email, phone, CompanyType.PYME, status, address, locationId);
    }

    validateAdhesion(): void {
        if (this.employeesCount > this.MAX_EMPLOYEES) {
            throw new DomainException(
                `PYME cannot have more than ${this.MAX_EMPLOYEES} employees`
            );
        }
    }
}