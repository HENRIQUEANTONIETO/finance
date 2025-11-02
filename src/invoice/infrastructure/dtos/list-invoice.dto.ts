import { ListInvoiceUseCase } from '@/invoice/application/usecases/invoice/list-invoice.usecase'
import { SortDirection } from '@/shared/domain/repositories/searchable-repository-contracts'

export class ListInvoiceDto implements ListInvoiceUseCase.Input {
  page?: number
  perPage?: number
  sort?: string
  sortDir?: SortDirection
  year: number
}
