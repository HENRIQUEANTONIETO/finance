import { LayoutEntity } from '@/layout/domain/entities/layout.entity'
import { LayoutRepository } from '@/layout/domain/repositories/layout.repository'
import { NotFoundError } from '@/shared/domain/errors/not-found-error'
import { SearchResult } from '@/shared/domain/repositories/searchable-repository-contracts'
import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service'
import { type Prisma } from '@prisma/client'

export class LayoutPrismaRepository implements LayoutRepository.Repository {
  sortableFields: string[] = ['name']

  constructor(private prismaService: PrismaService) {}

  layoutExists(name: string, id?: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
  async search(
    props: LayoutRepository.SearchParams,
  ): Promise<LayoutRepository.SearchResult> {
    const sortable = this.sortableFields.includes(props.sort) || false
    const orderByField = sortable ? props.sort : 'name'
    const orderByDir = sortable ? props.sortDir : 'asc'

    const count = await this.prismaService.layout.count({
      ...(props.filter && {
        where: {
          name: {
            contains: props.filter,
            mode: 'insensitive',
          },
        },
      }),
    })

    const result = await this.prismaService.layout.findMany({
      skip: props.page && props.page > 0 ? (props.page - 1) * props.perPage : 1,
      orderBy: { [orderByField]: orderByDir },
      take: props.perPage && props.perPage > 0 ? props.perPage : 15,
      // where: props.filter ? { name: props.filter } : undefined,
    })

    const models = result.map(model => new LayoutEntity(model))

    return new LayoutRepository.SearchResult({
      items: models,
      currentPage: props.page,
      perPage: props.perPage,
      sort: orderByField,
      sortDir: orderByDir,
      total: count,
      filter: props.filter,
    })
  }
  async insert(entity: LayoutEntity): Promise<void> {
    await this.prismaService.layout.create({ data: entity })
  }
  findById(id: string): Promise<LayoutEntity> {
    return this._get(id)
  }
  async findAll(): Promise<LayoutEntity[]> {
    const models = await this.prismaService.layout.findMany()
    return models.map(model => new LayoutEntity(model))
  }
  update(entity: LayoutEntity): Promise<void> {
    throw new Error('Method not implemented.')
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  protected async _get(id: string): Promise<LayoutEntity> {
    try {
      const layout = await this.prismaService.layout.findUnique({
        where: { id },
      })

      return new LayoutEntity(layout, layout.id)
    } catch {
      throw new NotFoundError(`Layout not found using ID ${id}`)
    }
  }
}
