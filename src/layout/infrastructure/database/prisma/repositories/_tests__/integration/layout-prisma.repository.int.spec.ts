import { PrismaClient } from '@prisma/client'
import { LayoutPrismaRepository } from '../../layout-prisma.repository'
import { LayoutDataBuilder } from '@/layout/domain/testing/helpers/layout-data-builder'
import { LayoutEntity } from '@/layout/domain/entities/layout.entity'
import { setupPrismaTests } from '../../../testing/setup-prisma-tests'
import { NotFoundError } from '@/shared/domain/errors/not-found-error'

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

  it('should throws error when entity not found', async () => {
    expect(() => sut.findById('fakeId')).rejects.toThrow(
      new NotFoundError('Layout not found using ID fakeId'),
    )
  })

  it('should finds an entity by id', async () => {
    const entity = new LayoutEntity(LayoutDataBuilder())
    const newLayout = await prismaService.layout.create({ data: entity })

    const output = await sut.findById(newLayout.id)
    expect(output.toJSON()).toStrictEqual(entity.toJSON())
  })

  it('should insert a new entity', async () => {
    const entity = new LayoutEntity(LayoutDataBuilder())
    await sut.insert(entity)

    const result = await prismaService.layout.findUnique({
      where: { id: entity.id },
    })
    expect(result).toStrictEqual(entity.toJSON())
  })

  it('should find all entities', async () => {
    const items = [
      new LayoutEntity(LayoutDataBuilder({ name: 'teste1' })),
      new LayoutEntity(LayoutDataBuilder({ name: 'teste2' })),
    ]
    await prismaService.layout.createMany({ data: items })
    const output = await sut.findAll()
    expect(output).toHaveLength(2)
    expect(output.map(i => i.toJSON())).toStrictEqual(items.map(i => i.toJSON()))
  })
})
