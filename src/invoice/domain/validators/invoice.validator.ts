import {
  ArrayNotEmpty,
  IsArray,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator'
import { Type } from 'class-transformer'

import { InvoiceProps } from '../entities/invoice.entity'
import { ClassValidatorFields } from '@/shared/domain/validators/class-validator-fields'
import { InvoiceItemRules } from './invoice-item.validator'

export class InvoiceRules {
  @IsNotEmpty()
  @IsString()
  bankId: string

  @IsInt()
  @Min(1)
  @Max(12)
  month: number

  @IsInt()
  @Min(2000)
  year: number

  @IsDate()
  @IsOptional()
  importedAt?: Date

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => InvoiceItemRules)
  items: InvoiceItemRules[]

  constructor({ bankId, month, year, importedAt, items }: InvoiceProps) {
    this.bankId = bankId
    this.month = month
    this.year = year
    this.importedAt = importedAt
    this.items = items
  }
}
export class InvoiceValidator extends ClassValidatorFields<InvoiceRules> {
  validate(data: InvoiceProps): boolean {
    const dataToValidate = new InvoiceRules(data)
    return super.validate(dataToValidate)
  }
}
export class InvoiceValidatorFactory {
  static create(): InvoiceValidator {
    return new InvoiceValidator()
  }
}
