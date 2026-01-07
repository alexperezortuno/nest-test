import {CompanyType} from "../value-objects/company-type.vo";
import {StatusType} from "../value-objects/status-type.vo";
import {LocationId} from "../value-objects/location-id.vo";


export abstract class Company {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly taxId: string,
        public readonly email: string,
        public readonly phone: string,
        public readonly Address: string,
        public readonly locationId: LocationId,
        public readonly type: CompanyType,
        public status?: StatusType
    ) {}

    abstract validateAdhesion(): void;
}