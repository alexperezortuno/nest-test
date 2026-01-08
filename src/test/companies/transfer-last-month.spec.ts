import {CompanyService} from '../../companies/services/company.service';
import {InMemoryCompanyRepository} from '../../companies/infrastructure/persistence/in-memory/company.repository';
import {InMemoryTransferRepository} from '../../companies/infrastructure/persistence/in-memory/transfer.repository';
import {CompanyType} from '../../companies/domain/value-objects/company-type.vo';
import {HttpException} from "@nestjs/common";
import {LocationId} from "../../companies/domain/value-objects/location-id.vo";
import {ResponseCompanyDto} from "../../companies/dtos/response-company.dto";
import {CreateCompanyDto} from "../../companies/dtos/create-company.dto";

describe('CompanyService', () => {
    let service: CompanyService;

    beforeEach(() => {
        const companyRepo = new InMemoryCompanyRepository();
        const transferRepo = new InMemoryTransferRepository();
        service = new CompanyService(companyRepo, transferRepo);
    });

    it('creates a PYME company successfully', async () => {
        const company: ResponseCompanyDto | HttpException = await service.create({
            name: 'ACME Spa',
            taxId: '30-12345678-9',
            email: 'admin@acme.com',
            phone: '+56912345678',
            address: 'Av Siempre Viva 742',
            locationId: LocationId.CHILE,
            type: CompanyType.PYME,
            employeesCount: 50
        });

        if (!(company instanceof HttpException)) {
            expect(company.type).toBe(CompanyType.PYME);
        }

        if (!(company instanceof HttpException)) {
            expect(company.status).toBeDefined();
        }
    });

    it('throws error when creating duplicated company', async () => {
        const dto: CreateCompanyDto = {
            name: 'ACME Spa',
            taxId: '30-12345678-9',
            email: 'admin@acme.com',
            phone: '+56912345678',
            address: 'Av Siempre Viva 742',
            locationId: LocationId.CHILE,
            type: CompanyType.PYME,
        };

        await service.create(dto);

        await expect(service.create(dto)).rejects.toBeInstanceOf(HttpException);
    });
});
