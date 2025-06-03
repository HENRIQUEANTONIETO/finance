import { LayoutEntity } from '../entities/layout.entity'
import {
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult,
  SearchableRepositoryInterface,
} from '@/shared/domain/repositories/searchable-repository-contracts'

export namespace LayoutRepository {
  export type Filter = string

  export class SearchParams extends DefaultSearchParams<Filter> {}

  export class SearchResult extends DefaultSearchResult<LayoutEntity, Filter> {}

  export interface Repository
    extends SearchableRepositoryInterface<
      LayoutEntity,
      Filter,
      SearchParams,
      SearchResult
    > {
    layoutExists(name: string, id?: string): Promise<void>
  }
}
