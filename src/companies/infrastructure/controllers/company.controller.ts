import {Body, Controller, Delete, Get, HttpException, Param, Post} from "@nestjs/common";
import {CreateCompanyDto} from "../../dtos/create-company.dto";
import {CompanyService} from "../../services/company.service";
import {Company} from "../../domain/entities/company.entity";
import {Corporate} from "../../domain/entities/corporate.entity";
import {Pyme} from "../../domain/entities/pyme.entity";
import {DefaultResponseDto} from "../../../shared/utils/dtos/default-response.dto";

@Controller('companies')
export class CompanyController {
    constructor(private readonly service: CompanyService) {}

    @Post('create')
    async create(@Body() dto: CreateCompanyDto): Promise<Corporate | Pyme | HttpException> {
        return await this.service.create(dto);
    }

    @Get('pyme')
    async findAllPyme(): Promise<Pyme[] | HttpException> {
        return await this.service.findAllPyme();
    }

    @Get('corporate')
    async findAllCorporate(): Promise<Corporate[] | HttpException> {
        return await this.service.findAllCorporate();
    }

    @Delete("delete/:id")
    async delete(@Param('id') id: string): Promise<DefaultResponseDto | HttpException> {
        return await this.service.delete(id);
    }
}