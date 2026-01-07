import {CompanyRepositoryPort} from "../domain/ports/company.repository.port";
import {CreateCompanyDto} from "../dtos/create-company.dto";
import {Corporate} from "../domain/entities/corporate.entity";
import {Pyme} from "../domain/entities/pyme.entity";

export class CompanyService {
    constructor(
        private readonly companyRepository: CompanyRepositoryPort
    ) {
    }

    async create(dto: CreateCompanyDto) {
        const taxId: string = dto.taxId.replace(/\D/g, '');

        if (await this.companyRepository.findByTaxId(taxId)) {
            throw new Error('Tax ID already exists');
        }

        const id = crypto.randomUUID();
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