import {
  IsArray,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator'
import { Type } from 'class-transformer'
import { InvoiceProps } from '../entities/invoice.entity'
import { ClassValidatorFields } from '@/shared/domain/validators/class-validator-fields'
import { InvoiceItemRules } from './invoice-item.validator'
import {
  InvoiceItemEntity,
  InvoiceItemProps,
} from '../entities/invoice-item.entity'

export class InvoiceRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  bank: string

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
  @ValidateNested({ each: true })
  @Type(() => InvoiceItemRules)
  items: InvoiceItemProps[]

  constructor({ bank, items, month, year, importedAt }: InvoiceProps) {
    Object.assign(this, { bank, month, year, importedAt, items })
  }
}

export class InvoiceValidator extends ClassValidatorFields<InvoiceRules> {
  validate(data: InvoiceRules): boolean {
    const items = data.items.map(item => new InvoiceItemEntity(item))
    const dataToValidate = new InvoiceRules({ ...data, items })
    return super.validate(dataToValidate)
  }
}

export class InvoiceValidatorFactory {
  static create(): InvoiceValidator {
    return new InvoiceValidator()
  }
}
