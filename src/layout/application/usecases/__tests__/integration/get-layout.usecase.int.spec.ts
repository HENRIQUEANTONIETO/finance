import { LayoutPrismaRepository } from '@/layout/infrastructure/database/prisma/repositories/layout-prisma.repository'
import { PrismaClient } from '@prisma/client'
import { GetLayoutUseCase } from '../../get-layout.usecase'
import { LayoutEntity } from '@/layout/domain/entities/layout.entity'
import { LayoutDataBuilder } from '@/layout/domain/testing/helpers/layout-data-builder'
import { NotFoundError } from '@/shared/domain/errors/not-found-error'

describe('GetLayoutUseCase integration test', () => {
  const prismaService = new PrismaClient()
  let sut: GetLayoutUseCase.UseCase
  let repository: LayoutPrismaRepository

  beforeAll(async () => {
    repository = new LayoutPrismaRepository(prismaService as any)
  })

  beforeEach(async () => {
    sut = new GetLayoutUseCase.UseCase(repository)
    await prismaService.layout.deleteMany()
  })
  it('Should get a layout by id', async () => {
    const entity = new LayoutEntity(LayoutDataBuilder())
    const model = await prismaService.layout.create({ data: entity.toJSON() })
    const output = await sut.execute({ id: entity.id })

    expect(output).toMatchObject(model)
  })

  it('Should throw error when layout not found', async () => {
    await expect(() => sut.execute({ id: 'fakeId' })).rejects.toThrow(
      new NotFoundError('Layout not found using ID fakeId'),
    )
  })
})
