import { CreateInvoiceUseCase } from '@/invoice/application/usecases/invoice/create-invoice.usecase'
import { IsArray, IsNotEmpty, IsNumber, IsUUID, Max, Min } from 'class-validator'

export class CreateInvoiceDto implements CreateInvoiceUseCase.Input {
  @IsUUID()
  @IsNotEmpty()
  layoutId: string

  @IsArray()
  @IsNotEmpty()
  items: any[]

  @IsNumber()
  @Min(1)
  @Max(12)
  @IsNotEmpty()
  month: number

  @IsNumber()
  @IsNotEmpty()
  year: number
}
