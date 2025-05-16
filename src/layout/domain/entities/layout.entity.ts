import { Entity } from '@/shared/domain/entities/entity'
import { LayoutValidatorFactory } from '../validators/layout.validator'
import { EntityValidationError } from '@/shared/domain/errors/validation-error'

export type LayoutProps = {
  name: string
  titleField: string
  categoryField: string
  typeField?: string
  amountField: string
  dateField: string
}

export class LayoutEntity extends Entity<LayoutProps> {
  constructor(public readonly props: LayoutProps) {
    LayoutEntity.validate(props)
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

  static validate(props: LayoutProps): void {
    const validator = LayoutValidatorFactory.create()
    const isValid = validator.validate(props)
    if (!isValid) {
      throw new EntityValidationError(validator.errors)
    }
  }
}
