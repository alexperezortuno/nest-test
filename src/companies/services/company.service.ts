import {CompanyRepositoryPort} from "../domain/ports/company.repository.port";
import {CreateCompanyDto} from "../dtos/create-company.dto";
import {Corporate} from "../domain/entities/corporate.entity";
import {Pyme} from "../domain/entities/pyme.entity";
import {InMemoryCompanyRepository} from "../infrastructure/persistence/in-memory/company.repository";
import {randomUUID} from "node:crypto";
import {HttpException, HttpStatus} from "@nestjs/common";
import {DefaultResponseDto} from "../../shared/utils/dtos/default-response.dto";
import {LocationId} from "../domain/value-objects/location-id.vo";
import {ResponseCompanyDto} from "../dtos/response-company.dto";
import {TransferRepositoryPort} from "../domain/ports/transfer.repository.port";
import {InMemoryTransferRepository} from "../infrastructure/persistence/in-memory/transfer.repository";

export class CompanyService {
    constructor(
        private readonly companyRepository: CompanyRepositoryPort,
        private readonly transferRepository: TransferRepositoryPort,
    ) {
        // Only for testing purposes
        this.companyRepository = new InMemoryCompanyRepository();
        this.transferRepository = new InMemoryTransferRepository();
    }

    async create(dto: CreateCompanyDto): Promise<ResponseCompanyDto | HttpException> {
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

        return new ResponseCompanyDto(company);
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

    async getCompaniesWithTransfersLastMonth(days = 30) {
        const since = new Date();
        since.setDate(since.getDate() - days);

        const companyIds =
            await this.transferRepository.findCompanyIdsWithTransfersSince(since);

        const companies =
            await this.companyRepository.findByTaxIds(companyIds);

        return {
            from: since.toISOString().slice(0, 10),
            to: new Date().toISOString().slice(0, 10),
            count: companies.length,
            companies: companies.map(c => ({
                id: c.id,
                name: c.name,
                taxId: c.taxId,
                type: c.type,
                status: c.status,
            })),
        };
    }
}