import {
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult,
  SearchableRepositoryInterface,
} from '@/shared/domain/repositories/searchable-repository-contracts'
import { InvoiceEntity } from '../entities/invoice.entity'

export namespace InvoiceRepository {
  export type Filter = string | number

  export class SearchParams extends DefaultSearchParams<Filter> {}

  export class SearchResult extends DefaultSearchResult<InvoiceEntity, Filter> {}

  export interface Repository
    extends SearchableRepositoryInterface<
      InvoiceEntity,
      Filter,
      SearchParams,
      SearchResult
    > {
    alreadyImported(month: number, year: number, layoutId: string): Promise<void>
  }
}
