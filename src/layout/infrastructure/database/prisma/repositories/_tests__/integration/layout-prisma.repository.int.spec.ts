import { PrismaClient } from '@prisma/client'
import { LayoutPrismaRepository } from '../../layout-prisma.repository'
import { LayoutDataBuilder } from '@/layout/domain/testing/helpers/layout-data-builder'
import { LayoutEntity } from '@/layout/domain/entities/layout.entity'
import { setupPrismaTests } from '../../../testing/setup-prisma-tests'

describe('LayoutPrismaRepository integration tests', () => {
  let sut: LayoutPrismaRepository
  const prismaService = new PrismaClient()
  beforeAll(() => {
    setupPrismaTests()
  })

  beforeEach(async () => {
    sut = new LayoutPrismaRepository(prismaService as any)
    await prismaService.layout.deleteMany()
  })
  it('should finds an entity by id', async () => {
    const entity = new LayoutEntity(LayoutDataBuilder())
    const newLayout = await prismaService.layout.create({ data: entity })

    const output = await sut.findById(newLayout.id)
    expect(output.toJSON()).toStrictEqual(entity.toJSON())
  })
})
