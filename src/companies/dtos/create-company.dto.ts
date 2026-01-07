import {LocationId} from "../domain/value-objects/location-id.vo";
import {CompanyType} from "../domain/value-objects/company-type.vo";

export class CreateCompanyDto {
    name: string;
    taxId: string;
    email: string;
    phone: string;
    address: string;
    locationId: LocationId;
    type: CompanyType;
    employeesCount?: number;
    capital?: number;
}