import { ConflictError } from '@/shared/domain/errors/conflict-error'
import { InMemorySearchableRepository } from '@/shared/domain/repositories/in-memory-searchable.repository'
import { SortDirection } from '@/shared/domain/repositories/searchable-repository-contracts'
import { LayoutEntity } from '@/layout/domain/entities/layout.entity'
import { LayoutRepository } from '@/layout/domain/repositories/layout.repository'

export class LayoutInMemoryRepository
  extends InMemorySearchableRepository<LayoutEntity>
  implements LayoutRepository.Repository
{
  sortableFields: string[] = ['name']

  async layoutExists(name: string): Promise<void> {
    const entity = this.items.find(item => item.name === name)
    if (entity) {
      throw new ConflictError('Layout name already created')
    }
  }

  protected async applyFilter(
    items: LayoutEntity[],
    filter: LayoutRepository.Filter,
  ): Promise<LayoutEntity[]> {
    if (!filter) {
      return items
    }
    return items.filter(item => {
      return item.props.name.toLowerCase().includes(filter.toLowerCase())
    })
  }

  protected async applySort(
    items: LayoutEntity[],
    sort: string | null,
    sortDir: SortDirection | null,
  ): Promise<LayoutEntity[]> {
    return !sort
      ? super.applySort(items, 'name', 'asc')
      : super.applySort(items, sort, sortDir)
  }
}
