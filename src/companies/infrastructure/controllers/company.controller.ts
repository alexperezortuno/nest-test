import {Body, Controller, HttpException, Post} from "@nestjs/common";
import {CreateCompanyDto} from "../../dtos/create-company.dto";
import {CompanyService} from "../../services/company.service";
import {Company} from "../../domain/entities/company.entity";
import {Corporate} from "../../domain/entities/corporate.entity";
import {Pyme} from "../../domain/entities/pyme.entity";

@Controller('companies')
export class CompanyController {
    constructor(private readonly service: CompanyService) {}

    @Post('create')
    async create(@Body() dto: CreateCompanyDto): Promise<Corporate | Pyme | Error> {
        return await this.service.create(dto);
    }
}