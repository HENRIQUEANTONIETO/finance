import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator'
import { InvoiceItemProps } from '../entities/invoice-item.entity'
import { ClassValidatorFields } from '@/shared/domain/validators/class-validator-fields'

export class InvoiceItemRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  title: string

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  category: string

  @MaxLength(255)
  @IsString()
  @IsOptional()
  type?: string

  @IsNumber()
  @IsNotEmpty()
  amount: number

  @IsDate()
  @IsNotEmpty()
  date: Date

  constructor({ amount, category, date, title, type }: InvoiceItemProps) {
    Object.assign(this, { amount, category, date, title, type })
  }
}

export class InvoiceItemValidator extends ClassValidatorFields<InvoiceItemRules> {
  validate(data: InvoiceItemRules): boolean {
    return super.validate(new InvoiceItemRules(data))
  }
}

export class InvoiceItemValidatorFactory {
  static create(): InvoiceItemValidator {
    return new InvoiceItemValidator()
  }
}
