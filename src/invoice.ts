import { randomUUID } from 'node:crypto'

export class Invoice {
    public readonly id: string
    public readonly description: string
    public readonly category: string
    public readonly type: string
    public readonly amount: number

    constructor(description: string, category: string, type: string, amount: number) {
        this.id = randomUUID()
        this.description = description
        this.category = category
        this.type = type
        this.amount = amount
    }
}