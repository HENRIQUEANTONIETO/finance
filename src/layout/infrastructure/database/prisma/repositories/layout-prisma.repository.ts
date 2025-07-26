import { LayoutEntity } from '@/layout/domain/entities/layout.entity'
import { LayoutRepository } from '@/layout/domain/repositories/layout.repository'
import { NotFoundError } from '@/shared/domain/errors/not-found-error'
import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service'

export class LayoutPrismaRepository implements LayoutRepository.Repository {
  sortableFields: string[]

  constructor(private prismaService: PrismaService) {}

  layoutExists(name: string, id?: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
  search(props: LayoutRepository.SearchParams): Promise<LayoutRepository.SearchResult> {
    throw new Error('Method not implemented.')
  }
  async insert(entity: LayoutEntity): Promise<void> {
    await this.prismaService.layout.create({ data: entity })
  }
  findById(id: string): Promise<LayoutEntity> {
    return this._get(id)
  }
  findAll(): Promise<LayoutEntity[]> {
    throw new Error('Method not implemented.')
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
