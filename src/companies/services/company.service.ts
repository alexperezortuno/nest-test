import {CompanyRepositoryPort} from "../domain/ports/company.repository.port";
import {CreateCompanyDto} from "../dtos/create-company.dto";
import {Corporate} from "../domain/entities/corporate.entity";
import {Pyme} from "../domain/entities/pyme.entity";
import {InMemoryCompanyRepository} from "../infrastructure/persistence/in-memory/company.repository";
import {randomUUID} from "node:crypto";
import {HttpException, HttpStatus} from "@nestjs/common";

export class CompanyService {
    constructor(
        private readonly companyRepository: CompanyRepositoryPort
    ) {
        this.companyRepository = new InMemoryCompanyRepository();
    }

    async create(dto: CreateCompanyDto): Promise<Corporate | Pyme | Error> {
        const taxId: string = dto.taxId.replace(/\D/g, '');

        if (await this.companyRepository.findByTaxId(taxId)) {
            throw new HttpException('Tax ID already exists', HttpStatus.CONFLICT);
        }

        const id = randomUUID();
        let company: Corporate | Pyme = new Pyme(
            id,
            dto.name,
            taxId,
            dto.email,
            dto.phone,
            dto.address,
            dto.locationId,
            dto.employeesCount
        );

        if (dto.type === 'CORPORATE') {
            company = new Corporate(
                id,
                dto.name,
                dto.taxId,
                dto.email,
                dto.phone,
                dto.address,
                dto.locationId,
                dto.capital
            )
        }

        await this.companyRepository.save(company);

        return company;
    }
}