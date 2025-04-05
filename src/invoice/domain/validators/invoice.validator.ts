import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator'
import { InvoiceProps } from '../entities/invoice.entity'

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
