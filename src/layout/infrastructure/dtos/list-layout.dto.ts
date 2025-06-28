import { ListLayoutUseCase } from '@/layout/application/usecases/list-layout.usecase'
import { SortDirection } from '@/shared/domain/repositories/searchable-repository-contracts'

export class ListLayoutDto implements ListLayoutUseCase.Input {
  page?: number
  perPage?: number
  sort?: string | null
  sortDir?: SortDirection | null
  filter?: string
}
