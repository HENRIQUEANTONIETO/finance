import { LayoutPrismaRepository } from '@/layout/infrastructure/database/prisma/repositories/layout-prisma.repository'
import { PrismaClient } from '@prisma/client'
import { DeleteLayoutUseCase } from '../../delete-layout.usecase'
import { LayoutEntity } from '@/layout/domain/entities/layout.entity'
import { LayoutDataBuilder } from '@/layout/domain/testing/helpers/layout-data-builder'
import { NotFoundError } from '@/shared/domain/errors/not-found-error'

describe('DeleteLayoutUseCase integration test', () => {
  const prismaService = new PrismaClient()
  let sut: DeleteLayoutUseCase.UseCase
  let repository: LayoutPrismaRepository

  beforeAll(async () => {
    repository = new LayoutPrismaRepository(prismaService as any)
  })

  beforeEach(async () => {
    sut = new DeleteLayoutUseCase.UseCase(repository)
    await prismaService.layout.deleteMany()
  })
  it('Should delete a layout', async () => {
    const entity = new LayoutEntity(LayoutDataBuilder())
    await prismaService.layout.create({ data: entity.toJSON() })
    await sut.execute({ id: entity.id })
    const output = await prismaService.layout.findUnique({ where: { id: entity.id } })

    expect(output).toBe(null)
  })

  it('Should throw error when layout not found', async () => {
    await expect(() => sut.execute({ id: 'fakeId' })).rejects.toThrow(
      new NotFoundError('Layout not found using ID fakeId'),
    )
  })
})
