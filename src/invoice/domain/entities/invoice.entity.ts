import { Entity } from '@/shared/domain/entities/entity'

export type InvoiceProps = {
  description: string
  category: string
  type: string
  amount: number
  date: Date
}
export class Invoice extends Entity<InvoiceProps> {
  constructor(public readonly props: InvoiceProps) {
    super(props)
  }
}
