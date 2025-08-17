import { LayoutEntity } from '@/layout/domain/entities/layout.entity'
import { LayoutRepository } from '@/layout/domain/repositories/layout.repository'
import { ConflictError } from '@/shared/domain/errors/conflict-error'
import { NotFoundError } from '@/shared/domain/errors/not-found-error'
import { SearchResult } from '@/shared/domain/repositories/searchable-repository-contracts'
import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service'
import { type Prisma } from '@prisma/client'

export class LayoutPrismaRepository implements LayoutRepository.Repository {
  sortableFields: string[] = ['name']

  constructor(private prismaService: PrismaService) {}

  async layoutExists(name: string): Promise<void> {
    const layout = await this.prismaService.layout.findUnique({ where: { name } })
    if (layout) {
      throw new ConflictError('Layout already exists')
    }
  }
  async search(
    props: LayoutRepository.SearchParams,
  ): Promise<LayoutRepository.SearchResult> {
    throw new Error('Method not implemented.')
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
  async update(entity: LayoutEntity): Promise<void> {
    await this._get(entity.id)
    await this.prismaService.layout.update({
      data: entity.toJSON(),
      where: { id: entity.id },
    })
  }
  async delete(id: string): Promise<void> {
    await this._get(id)
    await this.prismaService.layout.delete({ where: { id } })
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
