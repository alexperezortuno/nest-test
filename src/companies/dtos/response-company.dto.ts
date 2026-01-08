import {CompanyType} from "../domain/value-objects/company-type.vo";
import {StatusType} from "../domain/value-objects/status-type.vo";
import {LocationId} from "../domain/value-objects/location-id.vo";
import {IsEnum, IsNumber, IsString} from "class-validator";
import {Company} from "../domain/entities/company.entity";

export class ResponseCompanyDto {

    constructor(company: Company) {
        this.id = company.id;
        this.name = company.name;
        this.taxId = company.taxId;
        this.email = company.email;
        this.phone = company.phone;
        this.address = company.Address;
        this.locationId = company.locationId;
        this.status = company.status;
        this.type = company.type;
        this.employeesCount = (company as any).employeesCount;
        this.capital = (company as any).capital;
    }

    @IsString()
    id: string;

    @IsString()
    name: string;

    @IsString()
    taxId: string;

    @IsString()
    email: string;

    @IsString()
    phone: string;

    @IsString()
    address: string;

    @IsString()
    locationId: LocationId;

    @IsEnum(StatusType)
    status: StatusType;

    @IsEnum(CompanyType)
    type: CompanyType;

    @IsNumber()
    employeesCount?: number;

    @IsNumber()
    capital?: number;
}