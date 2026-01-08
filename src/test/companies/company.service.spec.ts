import {CompanyType} from "../../companies/domain/value-objects/company-type.vo";
import {HttpException} from "@nestjs/common";
import {InMemoryCompanyRepository} from "../../companies/infrastructure/persistence/in-memory/company.repository";
import {InMemoryTransferRepository} from "../../companies/infrastructure/persistence/in-memory/transfer.repository";
import {CompanyService} from "../../companies/services/company.service";
import {LocationId} from "../../companies/domain/value-objects/location-id.vo";
import {CreateCompanyDto} from "../../companies/dtos/create-company.dto";

describe('CompanyService', () => {
    let service: CompanyService;

    beforeEach(() => {
        const companyRepo = new InMemoryCompanyRepository();
        const transferRepo = new InMemoryTransferRepository();
        service = new CompanyService(companyRepo, transferRepo);
    });

    it('creates a PYME company successfully', async () => {
        const company = await service.create({
            name: 'pyme-1',
            taxId: 'TAX-PYME-1',
            email: 'pyme@example.com',
            phone: '12345678',
            address: 'Av 1',
            locationId: LocationId.ARGENTINA,
            type: CompanyType.PYME,
            employeesCount: 50,
        });

        if (!(company instanceof HttpException)) {
            expect(company.type).toBe(CompanyType.PYME);
            expect(company.status).toBeDefined();
        }
    });

    it('throws error when creating duplicated company', async () => {
        const dto: CreateCompanyDto = {
            name: 'pyme-1',
            taxId: 'TAX-PYME-1',
            email: 'pyme@example.com',
            phone: '123456789',
            address: 'Av 2',
            locationId: LocationId.ARGENTINA,
            type: CompanyType.PYME,
        };

        await service.create(dto);

        await expect(service.create(dto)).rejects.toBeInstanceOf(HttpException);
    });
});