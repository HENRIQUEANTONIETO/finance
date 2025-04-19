import { Entity } from '@/shared/domain/entities/entity'
import { InvoiceItemEntity } from './invoice-item.entity'

export type InvoiceProps = {
  bank: string
  items: InvoiceItemEntity[]
  month: number
  year: number
  importedAt?: Date
}
export class InvoiceEntity extends Entity<InvoiceProps> {
  constructor(public readonly props: InvoiceProps) {
    //InvoiceEntity.validate(props)
    super(props)
    this.props.importedAt = this.props.importedAt ?? new Date()
  }

  get bank(): string {
    return this.props.bank
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

  get year(): number {
    return this.props.year
  }

  // static validate(props: InvoiceItemProps): void {
  //   const validator = InvoiceItemValidatorFactory.create()
  //   const isValid = validator.validate(props)
  //   if (!isValid) {
  //     throw new EntityValidationError(validator.errors)
  //   }
  // }
}
