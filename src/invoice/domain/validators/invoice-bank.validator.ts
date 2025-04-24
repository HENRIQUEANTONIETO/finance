import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator'
import { InvoiceBankProps } from '../entities/invoice-bank.entity'
import { ClassValidatorFields } from '@/shared/domain/validators/class-validator-fields'

export class InvoiceBankRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  titleField: string

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  categoryField: string

  @MaxLength(255)
  @IsString()
  @IsOptional()
  typeField?: string

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  amountField: string

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  dateField: string

  constructor({
    name,
    amountField,
    categoryField,
    dateField,
    titleField,
    typeField,
  }: InvoiceBankProps) {
    Object.assign(this, {
      name,
      amountField,
      categoryField,
      dateField,
      titleField,
      typeField,
    })
  }
}

export class InvoiceBankValidator extends ClassValidatorFields<InvoiceBankRules> {
  validate(data: InvoiceBankRules): boolean {
    return super.validate(new InvoiceBankRules(data))
  }
}

export class InvoiceBankValidatorFactory {
  static create(): InvoiceBankValidator {
    return new InvoiceBankValidator()
  }
}
