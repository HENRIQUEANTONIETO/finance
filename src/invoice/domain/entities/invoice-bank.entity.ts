import { Entity } from '@/shared/domain/entities/entity'
import { InvoiceBankValidatorFactory } from '../validators/invoice-bank.validator'
import { EntityValidationError } from '@/shared/domain/errors/validation-error'

export type InvoiceBankProps = {
  name: string
  titleField: string
  categoryField: string
  typeField?: string
  amountField: string
  dateField: string
}

export class InvoiceBankEntity extends Entity<InvoiceBankProps> {
  constructor(public readonly props: InvoiceBankProps) {
    InvoiceBankEntity.validate(props)
    super(props)
  }

  get name(): string {
    return this.props.name
  }

  get titleField(): string {
    return this.props.titleField
  }

  get categoryField(): string {
    return this.props.categoryField
  }

  get typeField(): string {
    return this.props.typeField
  }

  get amountField(): string {
    return this.props.amountField
  }

  get dateField(): string {
    return this.props.dateField
  }

  static validate(props: InvoiceBankProps): void {
    const validator = InvoiceBankValidatorFactory.create()
    const isValid = validator.validate(props)
    if (!isValid) {
      throw new EntityValidationError(validator.errors)
    }
  }
}
