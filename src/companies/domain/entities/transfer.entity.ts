export class Transfer {
    constructor(
        public readonly id: string,
        public readonly taxId: string,
        public readonly amount: number,
        public readonly createdAt: Date,
    ) {}
}
