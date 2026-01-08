import {Transfer} from "../../../domain/entities/transfer.entity";
import {TransferRepositoryPort} from "../../../domain/ports/transfer.repository.port";

export class InMemoryTransferRepository implements TransferRepositoryPort {
    private transfers: Transfer[] = [
        new Transfer('transfer_id-1', '1', 1000, daysAgo(10)),
        new Transfer('transfer_id-2', '1', 2000, daysAgo(5)),
        new Transfer('transfer_id-3', '1', 3000, daysAgo(40)),
        new Transfer('transfer_id-4', '2', 4000, daysAgo(1)),
        new Transfer('transfer_id-5', '2', 5000, daysAgo(2)),
        new Transfer('transfer_id-6', '2', 6000, daysAgo(3)),
    ];

    async findCompanyIdsWithTransfersSince(date: Date): Promise<string[]> {
        const ids = new Set<string>();

        for (const transfer of this.transfers) {
            if (transfer.createdAt >= date) {
                ids.add(transfer.taxId);
            }
        }

        return Array.from(ids);
    }
}

function daysAgo(days: number): Date {
    const d = new Date();
    d.setDate(d.getDate() - days);
    return d;
}