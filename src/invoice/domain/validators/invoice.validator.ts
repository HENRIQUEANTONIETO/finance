import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator'
import { InvoiceProps } from '../entities/invoice.entity'
import { ClassValidatorFields } from '@/shared/domain/validators/class-validator-fields'

export class InvoiceRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  description: string

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  category: string

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  type: string

  @IsNumber()
  @IsNotEmpty()
  amount: number

  @IsDate()
  @IsNotEmpty()
  date: Date

  constructor({ amount, category, date, description, type }: InvoiceProps) {
    Object.assign(this, { amount, category, date, description, type })
  }
}

export class InvoiceValidator extends ClassValidatorFields<InvoiceRules> {
  validate(data: InvoiceRules): boolean {
    return super.validate(new InvoiceRules(data))
  }
}

export class InvoiceValidatorFactory {
  static create(): InvoiceValidator {
    return new InvoiceValidator()
  }
}
