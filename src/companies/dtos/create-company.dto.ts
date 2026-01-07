import {LocationId} from "../domain/value-objects/location-id.vo";
import {IsEmail, IsNumber, IsOptional, IsString} from "class-validator";

export class CreateCompanyDto {
    @IsString()
    name: string;

    @IsString()
    taxId: string;

    @IsEmail()
    email: string;

    @IsString()
    phone: string;

    @IsString()
    address: string;

    @IsString()
    locationId: LocationId;

    @IsString()
    type: string;

    @IsNumber()
    @IsOptional()
    employeesCount?: number;

    @IsNumber()
    @IsOptional()
    capital?: number;
}