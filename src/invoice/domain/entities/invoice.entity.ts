import { Entity } from '@/shared/domain/entities/entity'
import { InvoiceItemEntity } from './invoice-item.entity'
import { InvoiceValidatorFactory } from '../validators/invoice.validator'
import { EntityValidationError } from '@/shared/domain/errors/validation-error'

export type InvoiceProps = {
  layoutId: string
  items: InvoiceItemEntity[]
  month: number
  year: number
  importedAt?: Date
}
export class InvoiceEntity extends Entity<InvoiceProps> {
  constructor(public readonly props: InvoiceProps) {
    InvoiceEntity.validate(props)
    super(props)
    this.props.importedAt = this.props.importedAt ?? new Date()
  }

  get layoutId(): string {
    return this.props.layoutId
  }

  get items(): InvoiceItemEntity[] {
    return this.props.items
  }

  get importedAt(): Date {
    return this.props.importedAt
  }

  get month(): number {
    return this.props.month
  }

  set month(value: number) {
    InvoiceEntity.validate({ ...this.props, month: value })
    this.props.month = value
  }

  get year(): number {
    return this.props.year
  }

  set year(value: number) {
    InvoiceEntity.validate({ ...this.props, year: value })
    this.props.year = value
  }

  getTotal() {
    return this.items.reduce((acc, item) => acc + item.amount, 0)
  }

  static validate(props: InvoiceProps): void {
    const validator = InvoiceValidatorFactory.create()
    const isValid = validator.validate(props)
    if (!isValid) {
      throw new EntityValidationError(validator.errors)
    }
  }
}
