import {Body, Controller, Post} from "@nestjs/common";
import {CreateCompanyDto} from "../../dtos/create-company.dto";
import {CompanyService} from "../../services/company.service";

@Controller('companies')
export class CompanyController {
    constructor(private readonly service: CompanyService) {}

    @Post('create')
    create(@Body() dto: CreateCompanyDto) {
        return this.service.create(dto);
    }
}