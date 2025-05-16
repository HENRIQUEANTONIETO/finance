import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator'
import { LayoutProps } from '../entities/layout.entity'
import { ClassValidatorFields } from '@/shared/domain/validators/class-validator-fields'

export class LayoutRules {
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
  }: LayoutProps) {
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

export class LayoutValidator extends ClassValidatorFields<LayoutRules> {
  validate(data: LayoutRules): boolean {
    return super.validate(new LayoutRules(data))
  }
}

export class LayoutValidatorFactory {
  static create(): LayoutValidator {
    return new LayoutValidator()
  }
}
