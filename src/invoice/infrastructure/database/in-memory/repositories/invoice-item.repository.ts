import { InvoiceItemEntity } from '@/invoice/domain/entities/invoice-item.entity'
import { InvoiceItemRepository } from '@/invoice/domain/repositories/invoice-item.repository'
import { InMemorySearchableRepository } from '@/shared/domain/repositories/in-memory-searchable.repository'
import { SortDirection } from '@/shared/domain/repositories/searchable-repository-contracts'

export class InvoiceItemInMemoryRepository
  extends InMemorySearchableRepository<InvoiceItemEntity>
  implements InvoiceItemRepository.Repository
{
  sortableFields: string[] = ['date', 'title', 'amount']

  protected async applyFilter(
    items: InvoiceItemEntity[],
    filter: InvoiceItemRepository.Filter,
  ): Promise<InvoiceItemEntity[]> {
    if (!filter) {
      return items
    }
    return items.filter(item => {
      return item.props.date.toDateString().includes(filter.toLowerCase())
    })
  }

  protected async applySort(
    items: InvoiceItemEntity[],
    sort: string | null,
    sortDir: SortDirection | null,
  ): Promise<InvoiceItemEntity[]> {
    return !sort
      ? super.applySort(items, 'date', 'desc')
      : super.applySort(items, sort, sortDir)
  }
}
