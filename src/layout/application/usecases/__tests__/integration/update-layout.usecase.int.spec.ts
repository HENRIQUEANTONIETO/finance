import { LayoutPrismaRepository } from '@/layout/infrastructure/database/prisma/repositories/layout-prisma.repository'
import { UpdateLayoutUseCase } from '../../update-layout.usecase'
import { PrismaClient } from '@prisma/client'
import { LayoutEntity } from '@/layout/domain/entities/layout.entity'
import { LayoutDataBuilder } from '@/layout/domain/testing/helpers/layout-data-builder'
import { NotFoundError } from '@/shared/domain/errors/not-found-error'

describe('UpdateLayoutUseCase integration test', () => {
  const prismaService = new PrismaClient()
  let sut: UpdateLayoutUseCase.UseCase
  let repository: LayoutPrismaRepository

  beforeAll(async () => {
    repository = new LayoutPrismaRepository(prismaService as any)
  })

  beforeEach(async () => {
    sut = new UpdateLayoutUseCase.UseCase(repository)
    await prismaService.layout.deleteMany()
  })
  it('Should update a layout', async () => {
    const entity = new LayoutEntity(LayoutDataBuilder())
    await prismaService.layout.create({ data: entity.toJSON() })
    const output = await sut.execute({ id: entity.id, name: 'new name' })
    expect(output.name).toBe('new name')
  })

  it('Should throw an error when a layout id not found', async () => {
    await expect(() => sut.execute({ id: 'fakeId' })).rejects.toThrow(
      new NotFoundError('Layout not found using ID fakeId'),
    )
  })
})
