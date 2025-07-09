import { LayoutEntity } from '@/layout/domain/entities/layout.entity'
import { LayoutRepository } from '@/layout/domain/repositories/layout.repository'
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
  insert(entity: LayoutEntity): Promise<void> {
    throw new Error('Method not implemented.')
  }
  findById(id: string): Promise<LayoutEntity> {
    throw new Error('Method not implemented.')
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
}
