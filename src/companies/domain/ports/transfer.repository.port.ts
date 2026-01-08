export interface TransferRepositoryPort {
    findCompanyIdsWithTransfersSince(date: Date): Promise<string[]>;
}
