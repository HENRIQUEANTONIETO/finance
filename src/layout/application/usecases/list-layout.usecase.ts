import { LayoutRepository } from '@/layout/domain/repositories/layout.repository'
import { LayoutOutput, LayoutOutputMapper } from '../dtos/layout-output'
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case'
import { SearchInput } from '@/shared/application/dtos/search-input'
import {
  PaginationOutput,
  PaginationOutputMapper,
} from '@/shared/application/dtos/pagination-output'

export namespace ListLayoutUseCase {
  export type Input = SearchInput

  export type Output = PaginationOutput<LayoutOutput>

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private layoutRepository: LayoutRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const params = new LayoutRepository.SearchParams(input)
      const searchResult = await this.layoutRepository.search(params)
      return this.toOutput(searchResult)
    }

    private toOutput(searchResult: LayoutRepository.SearchResult): Output {
      const items = searchResult.items.map(item => {
        return LayoutOutputMapper.toOutput(item)
      })

      return PaginationOutputMapper.toOutput(items, searchResult)
    }
  }
}
