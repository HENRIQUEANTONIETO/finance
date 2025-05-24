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

  private set name(value: string) {
    this.props.name = value
  }

  private set titleField(value: string) {
    this.props.titleField = value
  }

  private set categoryField(value: string) {
    this.props.categoryField = value
  }

  private set typeField(value: string) {
    this.props.typeField = value
  }

  private set amountField(value: string) {
    this.props.amountField = value
  }

  private set dateField(value: string) {
    this.props.dateField = value
  }

  update(props: Partial<LayoutProps>) {
    const updatedProps = {
      ...this.props,
      ...props,
    }
    LayoutEntity.validate(updatedProps)
    this.name = props.name ?? this.name
    this.titleField = props.titleField ?? this.titleField
    this.categoryField = props.categoryField ?? this.categoryField
    this.typeField = props.typeField ?? this.typeField
    this.amountField = props.amountField ?? this.amountField
    this.dateField = props.dateField ?? this.dateField
  }

  static validate(props: LayoutProps): void {
    const validator = LayoutValidatorFactory.create()
    const isValid = validator.validate(props)
    if (!isValid) {
      throw new EntityValidationError(validator.errors)
    }
  }
}
