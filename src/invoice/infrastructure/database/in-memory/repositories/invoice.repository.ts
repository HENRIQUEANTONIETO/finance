import { InvoiceEntity } from '@/invoice/domain/entities/invoice.entity'
import { InvoiceRepository } from '@/invoice/domain/repositories/invoice.repository'
import { ConflictError } from '@/shared/domain/errors/conflict-error'
import { InMemorySearchableRepository } from '@/shared/domain/repositories/in-memory-searchable.repository'
import { SortDirection } from '@/shared/domain/repositories/searchable-repository-contracts'

export class InvoiceInMemoryRepository
  extends InMemorySearchableRepository<InvoiceEntity>
  implements InvoiceRepository.Repository
{
  sortableFields: string[] = ['month']

  protected async applyFilter(
    items: InvoiceEntity[],
    filter: InvoiceRepository.Filter,
  ): Promise<InvoiceEntity[]> {
    if (!filter) {
      return items
    }
    return items.filter(item => {
      return item.props.year == filter
    })
  }

  protected async applySort(
    items: InvoiceEntity[],
    sort: string | null,
    sortDir: SortDirection | null,
  ): Promise<InvoiceEntity[]> {
    return !sort
      ? super.applySort(items, 'month', 'desc')
      : super.applySort(items, sort, sortDir)
  }

  public async alreadyImported(
    month: number,
    year: number,
    layoutId: string,
  ): Promise<void> {
    const entity = this.items.find(
      item => item.month === month && item.year === year && item.layoutId === layoutId,
    )
    if (entity) {
      throw new ConflictError('Invoice has already imported')
    }
  }
}
