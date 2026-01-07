import {CompanyType} from "../domain/value-objects/company-type.vo";
import {StatusType} from "../domain/value-objects/status-type.vo";
import {LocationId} from "../domain/value-objects/location-id.vo";

export class ResponseCompanyDto {
    id: string;
    name: string;
    taxId: string;
    email: string;
    phone: string;
    address: string;
    locationId: LocationId;
    status: StatusType;
    type: CompanyType;
    employeesCount?: number;
}