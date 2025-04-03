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

  get description(): string {
    return this.props.description
  }

  set description(value: string) {
    this.props.description = value
  }

  get category(): string {
    return this.props.category
  }

  set category(value: string) {
    this.props.category = value
  }

  get type(): string {
    return this.props.type
  }

  set type(value: string) {
    this.props.type = value
  }

  get amount(): number {
    return this.props.amount
  }

  set amount(value: number) {
    this.props.amount = value
  }

  get date(): Date {
    return this.props.date
  }

  set date(value: Date) {
    this.props.date = value
  }
}
