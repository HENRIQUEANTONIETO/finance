import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case'
import { SearchInput } from '@/shared/application/dtos/search-input'
import {
  PaginationOutput,
  PaginationOutputMapper,
} from '@/shared/application/dtos/pagination-output'
import { InvoiceOutput, InvoiceOutputMapper } from '../../dtos/invoice-output'
import { InvoiceRepository } from '@/invoice/domain/repositories/invoice.repository'
import { type SearchResult } from '@/shared/domain/repositories/searchable-repository-contracts'
import { type InvoiceEntity } from '@/invoice/domain/entities/invoice.entity'
import { BadRequestError } from '@/shared/application/errors/bad-request-error'

export namespace ListInvoiceUseCase {
  export type Input = Omit<SearchInput, 'filter'> & { year: number }

  export type Output = PaginationOutput<InvoiceOutput>

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private layoutRepository: InvoiceRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      if (!input?.year) {
        throw new BadRequestError('year not provided')
      }

      const params = new InvoiceRepository.SearchParams({ ...input, filter: input.year })
      const searchResult = await this.layoutRepository.search(params)
      return this.toOutput(searchResult)
    }

    private toOutput(searchResult: InvoiceRepository.SearchResult): Output {
      const items = searchResult.items.map(item => {
        return InvoiceOutputMapper.toOutput(item)
      })

      return PaginationOutputMapper.toOutput(
        items,
        searchResult as SearchResult<InvoiceEntity>,
      )
    }
  }
}
