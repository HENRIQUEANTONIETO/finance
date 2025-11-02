import { ListInvoiceUseCase } from '@/invoice/application/usecases/invoice/list-invoice.usecase'
import { SortDirection } from '@/shared/domain/repositories/searchable-repository-contracts'
import { Type } from 'class-transformer'
import { IsNotEmpty, IsNumber } from 'class-validator'

export class ListInvoiceDto implements ListInvoiceUseCase.Input {
  page?: number
  perPage?: number
  sort?: string
  sortDir?: SortDirection

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  year: number
}
