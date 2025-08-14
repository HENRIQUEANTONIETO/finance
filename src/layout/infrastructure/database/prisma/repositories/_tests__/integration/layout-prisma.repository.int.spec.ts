import { PrismaClient } from '@prisma/client'
import { LayoutPrismaRepository } from '../../layout-prisma.repository'
import { LayoutDataBuilder } from '@/layout/domain/testing/helpers/layout-data-builder'
import { LayoutEntity } from '@/layout/domain/entities/layout.entity'
import { setupPrismaTests } from '../../../testing/setup-prisma-tests'
import { NotFoundError } from '@/shared/domain/errors/not-found-error'
import { LayoutRepository } from '@/layout/domain/repositories/layout.repository'

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

  it('should finds a layout by id', async () => {
    const entity = new LayoutEntity(LayoutDataBuilder())
    const newLayout = await prismaService.layout.create({ data: entity })

    const output = await sut.findById(newLayout.id)
    expect(output.toJSON()).toStrictEqual(entity.toJSON())
  })

  it('should insert a new layout', async () => {
    const entity = new LayoutEntity(LayoutDataBuilder())
    await sut.insert(entity)

    const result = await prismaService.layout.findUnique({
      where: { id: entity.id },
    })
    expect(result).toStrictEqual(entity.toJSON())
  })

  it('should return all layouts', async () => {
    const items = [
      new LayoutEntity(LayoutDataBuilder({ name: 'teste1' })),
      new LayoutEntity(LayoutDataBuilder({ name: 'teste2' })),
    ]
    await prismaService.layout.createMany({ data: items })
    const output = await sut.findAll()
    expect(output).toHaveLength(2)
    expect(output.map(i => i.toJSON())).toStrictEqual(items.map(i => i.toJSON()))
  })

  describe('search method tests', () => {
    it('should search layouts when params are null', async () => {
      const entities: LayoutEntity[] = []
      const arrange = Array(16).fill(LayoutDataBuilder())
      arrange.forEach((element, index) => {
        entities.push(
          new LayoutEntity({
            ...element,
            name: `Banco ${index}`,
          }),
        )
      })

      await prismaService.layout.createMany({ data: entities.map(item => item.toJSON()) })

      const searchOutput = await sut.search(new LayoutRepository.SearchParams({}))
      const items = searchOutput.items
      expect(searchOutput).toBeInstanceOf(LayoutRepository.SearchResult)
      expect(searchOutput.total).toBe(16)
      expect(items).toHaveLength(15)
      items.forEach((item, index) => {
        expect(item).toBeInstanceOf(LayoutEntity)
        // Não está fazendo a ordenação
        expect(`Banco ${index}`).toBe(item.name)
      })
    })

    // it('should search layouts with pagination', async () => {
    //   const entities: LayoutEntity[] = []
    //   const arrange = Array(16).fill(LayoutDataBuilder())
    //   arrange.forEach((element, index) => {
    //     entities.push(
    //       new LayoutEntity({
    //         ...element,
    //         name: `Banco ${index}`,
    //       }),
    //     )
    //   })

    //   await prismaService.layout.createMany({ data: entities })

    //   const searchOutput = await sut.search(
    //     new LayoutRepository.SearchParams({
    //       perPage: 10,
    //       page: 1,
    //     }),
    //   )

    //   expect(searchOutput.items).toHaveLength(10)
    //   expect(searchOutput.currentPage).toBe(1)
    //   expect(searchOutput.total).toBe(16)
    //   searchOutput.items.forEach(item => {
    //     expect(item).toBeInstanceOf(LayoutEntity)
    //   })
    // })
  })
})
