import {
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult,
  SearchableRepositoryInterface,
} from '@/shared/domain/repositories/searchable-repository-contracts'
import { InvoiceEntity } from '../entities/invoice.entity'

export namespace LayoutRepository {
  export type Filter = string

  export class SearchParams extends DefaultSearchParams<Filter> {}

  export class SearchResult extends DefaultSearchResult<InvoiceEntity, Filter> {}

  export interface Repository
    extends SearchableRepositoryInterface<
      InvoiceEntity,
      Filter,
      SearchParams,
      SearchResult
    > {}
}
