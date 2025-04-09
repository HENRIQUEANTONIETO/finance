import { Entity } from '@/shared/domain/entities/entity'
import { InvoiceItemValidatorFactory } from '../validators/invoice-item.validator'
import { EntityValidationError } from '@/shared/domain/errors/validation-error'

export type InvoiceItemProps = {
  title: string
  category: string
  type?: string
  amount: number
  date: Date
}
export class InvoiceItem extends Entity<InvoiceItemProps> {
  constructor(public readonly props: InvoiceItemProps) {
    InvoiceItem.validate(props)
    super(props)
  }

  get title(): string {
    return this.props.title
  }

  get category(): string {
    return this.props.category
  }

  get type(): string {
    return this.props.type
  }

  get amount(): number {
    return this.props.amount
  }

  get date(): Date {
    return this.props.date
  }

  static validate(props: InvoiceItemProps): void {
    const validator = InvoiceItemValidatorFactory.create()
    const isValid = validator.validate(props)
    if (!isValid) {
      throw new EntityValidationError(validator.errors)
    }
  }
}
