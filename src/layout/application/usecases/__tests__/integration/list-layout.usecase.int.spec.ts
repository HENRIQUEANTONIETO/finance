import { LayoutPrismaRepository } from '@/layout/infrastructure/database/prisma/repositories/layout-prisma.repository'
import { PrismaClient } from '@prisma/client'
import { ListLayoutUseCase } from '../../list-layout.usecase'
import { LayoutEntity } from '@/layout/domain/entities/layout.entity'
import { LayoutDataBuilder } from '@/layout/domain/testing/helpers/layout-data-builder'
import { setupPrismaTests } from '@/shared/infrastructure/database/prisma/testing/setup-prisma-tests'

describe('ListLayoutsUseCase integration tests', () => {
  const prismaService = new PrismaClient()
  let sut: ListLayoutUseCase.UseCase
  let repository: LayoutPrismaRepository

  beforeAll(async () => {
    setupPrismaTests()
    repository = new LayoutPrismaRepository(prismaService as any)
  })

  beforeEach(async () => {
    sut = new ListLayoutUseCase.UseCase(repository)
    await prismaService.layout.deleteMany()
  })

  it('should return the layouts ordered by name', async () => {
    const entities: LayoutEntity[] = []
    const arrange = Array(3).fill(LayoutDataBuilder({}))
    arrange.forEach((element, index) => {
      entities.push(
        new LayoutEntity({
          ...element,
          name: `name${index}`,
        }),
      )
    })
    await prismaService.layout.createMany({
      data: entities.map(item => item.toJSON()),
    })

    const output = await sut.execute({})

    expect(output).toStrictEqual({
      items: entities.map(item => item.toJSON()),
      total: 3,
      currentPage: 1,
      perPage: 15,
      lastPage: 1,
    })
  })

  it('should returns output using filter, sort and paginate', async () => {
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

    let output = await sut.execute({
      page: 1,
      perPage: 2,
      sort: 'name',
      sortDir: 'asc',
      filter: 'TEST',
    })

    expect(output).toMatchObject({
      items: [entities[0].toJSON(), entities[4].toJSON()],
      total: 3,
      currentPage: 1,
      perPage: 2,
      lastPage: 2,
    })

    output = await sut.execute({
      page: 2,
      perPage: 2,
      sort: 'name',
      sortDir: 'asc',
      filter: 'TEST',
    })

    expect(output).toMatchObject({
      items: [entities[2].toJSON()],
      total: 3,
      currentPage: 2,
      perPage: 2,
      lastPage: 2,
    })
  })
})
