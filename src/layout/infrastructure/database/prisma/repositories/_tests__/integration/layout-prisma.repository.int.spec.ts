import { PrismaClient } from '@prisma/client'
import { LayoutPrismaRepository } from '../../layout-prisma.repository'
import { LayoutDataBuilder } from '@/layout/domain/testing/helpers/layout-data-builder'
import { LayoutEntity } from '@/layout/domain/entities/layout.entity'
import { setupPrismaTests } from '../../../../../../../shared/infrastructure/database/prisma/testing/setup-prisma-tests'
import { NotFoundError } from '@/shared/domain/errors/not-found-error'
import { ConflictError } from '@/shared/domain/errors/conflict-error'
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

  it('should throw an error when layout is not found in update method', async () => {
    const entity = new LayoutEntity(LayoutDataBuilder())
    await expect(() => sut.update(entity)).rejects.toThrow(
      new NotFoundError(`Layout not found using ID ${entity.id}`),
    )
  })

  it('should update a layout', async () => {
    const entity = new LayoutEntity(LayoutDataBuilder())
    await prismaService.layout.create({ data: entity.toJSON() })

    entity.update({ name: 'new name' })
    await sut.update(entity)

    const output = await prismaService.layout.findUnique({ where: { id: entity.id } })

    expect(output.name).toBe('new name')
  })

  it('should throw an error when layout is not found in update method', async () => {
    await expect(() => sut.delete('fakeId')).rejects.toThrow(
      new NotFoundError(`Layout not found using ID fakeId`),
    )
  })

  it('should delete a layout', async () => {
    const entity = new LayoutEntity(LayoutDataBuilder())
    await prismaService.layout.create({ data: entity.toJSON() })

    await sut.delete(entity.id)

    const output = await prismaService.layout.findUnique({ where: { id: entity.id } })
    expect(output).toBe(null)
  })

  it('should throw error when layout name exists', async () => {
    const entity = new LayoutEntity(LayoutDataBuilder())
    await prismaService.layout.create({ data: entity.toJSON() })
    await expect(() => sut.layoutExists(entity.name)).rejects.toThrow(
      new ConflictError('Layout already exists'),
    )
  })

  it('Should not find a layout by name', async () => {
    expect.assertions(0)
    await sut.layoutExists('teste')
  })

  describe('search method tests', () => {
    it('should apply only pagination when the other params are null', async () => {
      const entities: LayoutEntity[] = []
      const arrange = Array(16).fill(LayoutDataBuilder({}))
      arrange.forEach((element, index) => {
        entities.push(
          new LayoutEntity({
            ...element,
            name: `test${index}`,
          }),
        )
      })

      await prismaService.layout.createMany({
        data: entities.map(item => item.toJSON()),
      })

      const searchOutput = await sut.search(new LayoutRepository.SearchParams())

      expect(searchOutput).toBeInstanceOf(LayoutRepository.SearchResult)
      expect(searchOutput.total).toBe(16)
      expect(searchOutput.items.length).toBe(15)
      searchOutput.items.forEach(item => {
        expect(item).toBeInstanceOf(LayoutEntity)
      })
    })

    it('should search using filter, sort and paginate', async () => {
      const entities: LayoutEntity[] = []
      const arrange = ['test', 'a', 'TEST', 'b', 'TeSt']
      arrange.forEach((element, index) => {
        entities.push(
          new LayoutEntity({
            ...LayoutDataBuilder({ name: element }),
          }),
        )
      })

      await prismaService.layout.createMany({
        data: entities.map(item => item.toJSON()),
      })

      const searchOutputPage1 = await sut.search(
        new LayoutRepository.SearchParams({
          page: 1,
          perPage: 2,
          sort: 'name',
          sortDir: 'asc',
          filter: 'TEST',
        }),
      )

      expect(searchOutputPage1.items[0].toJSON()).toMatchObject(entities[0].toJSON())
      expect(searchOutputPage1.items[1].toJSON()).toMatchObject(entities[4].toJSON())

      const searchOutputPage2 = await sut.search(
        new LayoutRepository.SearchParams({
          page: 2,
          perPage: 2,
          sort: 'name',
          sortDir: 'asc',
          filter: 'TEST',
        }),
      )

      expect(searchOutputPage2.items[0].toJSON()).toMatchObject(entities[2].toJSON())
    })
  })
})
