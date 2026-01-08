import {CompanyRepositoryPort} from "../domain/ports/company.repository.port";
import {CreateCompanyDto} from "../dtos/create-company.dto";
import {Corporate} from "../domain/entities/corporate.entity";
import {Pyme} from "../domain/entities/pyme.entity";
import {InMemoryCompanyRepository} from "../infrastructure/persistence/in-memory/company.repository";
import {randomUUID} from "node:crypto";
import {HttpException, HttpStatus} from "@nestjs/common";
import {DefaultResponseDto} from "../../shared/utils/dtos/default-response.dto";
import {LocationId} from "../domain/value-objects/location-id.vo";

export class CompanyService {
    constructor(
        private readonly companyRepository: CompanyRepositoryPort
    ) {
        // Only for testing purposes
        this.companyRepository = new InMemoryCompanyRepository();
    }

    async create(dto: CreateCompanyDto): Promise<Corporate | Pyme | HttpException> {
        if (!Object.values(LocationId).includes(dto.locationId as LocationId)) {
            throw new HttpException('Invalid location ID', HttpStatus.BAD_REQUEST);
        }

        const taxId: string = dto.taxId.replace(/\D/g, '');
        const locationId = dto.locationId as LocationId;

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
            locationId,
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
                locationId,
                dto.capital
            )
        }

        await this.companyRepository.create(company);

        return company;
    }

    async findAllPyme(): Promise<Pyme[] | HttpException> {
        const r: Pyme[] = await this.companyRepository.findAllPymes();
        if (r.length > 0) return r;
        throw new HttpException('No companies found', HttpStatus.NO_CONTENT);
    }

    async findAllCorporate(): Promise<Corporate[] | HttpException> {
        const r: Corporate[] = await this.companyRepository.findAllCorporates();
        if (r.length > 0) return r;
        throw new HttpException('No companies found', HttpStatus.NO_CONTENT);
    }

    async delete(taxId: string): Promise<any | HttpException> {
        if (!taxId) {
            return Promise.resolve(new HttpException('Invalid company ID', HttpStatus.BAD_REQUEST));
        }

        const company = await this.companyRepository.exists(taxId);
        if (!company) {
            throw new HttpException('Company not found', HttpStatus.NOT_FOUND)
        }

        return await this.companyRepository.delete(taxId)
            .then(() => {
                return new DefaultResponseDto('Company deleted successfully');
            })
            .catch(() => {
                throw new HttpException('Company not found', HttpStatus.NOT_FOUND);
            });
    }
}