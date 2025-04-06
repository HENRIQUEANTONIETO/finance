import { Entity } from '@/shared/domain/entities/entity'

export type InvoiceItemProps = {
  title: string
  category: string
  type?: string
  amount: number
  date: Date
}
export class InvoiceItem extends Entity<InvoiceItemProps> {
  constructor(public readonly props: InvoiceItemProps) {
    super(props)
  }

  get title(): string {
    return this.props.title
  }

  set title(value: string) {
    this.props.title = value
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
