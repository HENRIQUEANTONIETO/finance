import { InvoiceItemEntity } from '../entities/invoice-item.entity'

import {
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult,
  SearchableRepositoryInterface,
} from '@/shared/domain/repositories/searchable-repository-contracts'

export namespace InvoiceItemRepository {
  export type Filter = string

  export class SearchParams extends DefaultSearchParams<Filter> {}

  export class SearchResult extends DefaultSearchResult<InvoiceItemEntity, Filter> {}

  export interface Repository
    extends SearchableRepositoryInterface<
      InvoiceItemEntity,
      Filter,
      SearchParams,
      SearchResult
    > {}
}
