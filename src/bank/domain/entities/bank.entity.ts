import { Entity } from '@/shared/domain/entities/entity'
import { BankValidatorFactory } from '../validators/bank.validator'
import { EntityValidationError } from '@/shared/domain/errors/validation-error'

export type BankProps = {
  name: string
  titleField: string
  categoryField: string
  typeField?: string
  amountField: string
  dateField: string
}

export class BankEntity extends Entity<BankProps> {
  constructor(public readonly props: BankProps) {
    BankEntity.validate(props)
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

  static validate(props: BankProps): void {
    const validator = BankValidatorFactory.create()
    const isValid = validator.validate(props)
    if (!isValid) {
      throw new EntityValidationError(validator.errors)
    }
  }
}
