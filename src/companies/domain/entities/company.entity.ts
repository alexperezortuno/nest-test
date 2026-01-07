import {CompanyType} from "../value-objects/company-type.vo";

export type Status = 'PENDING' | 'APPROVED' | 'REJECTED';

export abstract class Company {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly taxId: string,
        public readonly email: string,
        public readonly phone: string,
        public readonly type: CompanyType,
        public status: Status,
        public readonly Address: string,
        public readonly locationId: string
    ) {}

    abstract validateAdhesion(): void;
}