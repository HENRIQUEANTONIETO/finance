import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator'
import { BankProps } from '../entities/bank.entity'
import { ClassValidatorFields } from '@/shared/domain/validators/class-validator-fields'

export class BankRules {
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
  }: BankProps) {
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

export class BankValidator extends ClassValidatorFields<BankRules> {
  validate(data: BankRules): boolean {
    return super.validate(new BankRules(data))
  }
}

export class BankValidatorFactory {
  static create(): BankValidator {
    return new BankValidator()
  }
}
