import { Entity } from '@/shared/domain/entities/entity'
import { InvoiceItemValidatorFactory } from '../validators/invoice-item.validator'
import { EntityValidationError } from '@/shared/domain/errors/validation-error'

export type InvoiceProps = {
  bank: string
  items: InvoiceEntity[]
  importedAt: Date
}
export class InvoiceEntity extends Entity<InvoiceProps> {
  constructor(public readonly props: InvoiceProps) {
    //InvoiceEntity.validate(props)
    super(props)
  }

  get bank(): string {
    return this.props.bank
  }

  get items(): InvoiceEntity[] {
    return this.props.items
  }

  get importedAt(): Date {
    return this.props.importedAt
  }

  // static validate(props: InvoiceItemProps): void {
  //   const validator = InvoiceItemValidatorFactory.create()
  //   const isValid = validator.validate(props)
  //   if (!isValid) {
  //     throw new EntityValidationError(validator.errors)
  //   }
  // }
}
