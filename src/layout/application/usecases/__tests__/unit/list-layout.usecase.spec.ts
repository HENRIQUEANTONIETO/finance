import { LayoutInMemoryRepository } from '@/layout/infrastructure/database/in-memory/repositories/layout-in-memory.repository'
import { ListLayoutUseCase } from '../../list-layout.usecase'
import { LayoutRepository } from '@/layout/domain/repositories/layout.repository'
import { LayoutEntity } from '@/layout/domain/entities/layout.entity'
import { LayoutDataBuilder } from '@/layout/domain/testing/helpers/layout-data-builder'

describe('ListLayoutUseCase unit tests', () => {
  let sut: ListLayoutUseCase.UseCase
  let repository: LayoutInMemoryRepository

  beforeEach(() => {
    repository = new LayoutInMemoryRepository()
    sut = new ListLayoutUseCase.UseCase(repository)
  })

  it('toOutput method', () => {
    let result = new LayoutRepository.SearchResult({
      items: [],
      total: 1,
      currentPage: 1,
      perPage: 2,
      sort: null,
      sortDir: null,
      filter: null,
    })
    let output = sut['toOutput'](result)
    expect(output).toStrictEqual({
      items: [],
      total: 1,
      currentPage: 1,
      lastPage: 1,
      perPage: 2,
    })

    const entity = new LayoutEntity(LayoutDataBuilder({}))
    result = new LayoutRepository.SearchResult({
      items: [entity],
      total: 1,
      currentPage: 1,
      perPage: 2,
      sort: null,
      sortDir: null,
      filter: null,
    })
    output = sut['toOutput'](result)
    expect(output).toStrictEqual({
      items: [entity.toJSON()],
      total: 1,
      currentPage: 1,
      lastPage: 1,
      perPage: 2,
    })
  })

  it('should return the layouts ordered by name', async () => {
    const items = [
      new LayoutEntity(LayoutDataBuilder({ name: 'Nubank' })),
      new LayoutEntity(LayoutDataBuilder({ name: 'Inter' })),
    ]
    repository.items = items
    const output = await sut.execute({})
    expect(output).toStrictEqual({
      items: [...items].reverse().map(item => item.toJSON()),
      total: 2,
      currentPage: 1,
      lastPage: 1,
      perPage: 15,
    })
  })

  it('should return the layouts using pagination, sort and filter', async () => {
    const items = [
      new LayoutEntity(LayoutDataBuilder({ name: 'a' })),
      new LayoutEntity(LayoutDataBuilder({ name: 'AA' })),
      new LayoutEntity(LayoutDataBuilder({ name: 'Aa' })),
      new LayoutEntity(LayoutDataBuilder({ name: 'b' })),
      new LayoutEntity(LayoutDataBuilder({ name: 'c' })),
    ]
    repository.items = items
    let output = await sut.execute({
      page: 1,
      perPage: 2,
      sort: 'name',
      sortDir: 'asc',
      filter: 'a',
    })
    expect(output).toStrictEqual({
      items: [items[1].toJSON(), items[2].toJSON()],
      total: 3,
      currentPage: 1,
      lastPage: 2,
      perPage: 2,
    })

    output = await sut.execute({
      page: 2,
      perPage: 2,
      sort: 'name',
      sortDir: 'asc',
      filter: 'a',
    })
    expect(output).toStrictEqual({
      items: [items[0].toJSON()],
      total: 3,
      currentPage: 2,
      lastPage: 2,
      perPage: 2,
    })

    output = await sut.execute({
      page: 1,
      perPage: 3,
      sort: 'name',
      sortDir: 'desc',
      filter: 'a',
    })
    expect(output).toStrictEqual({
      items: [items[0].toJSON(), items[2].toJSON(), items[1].toJSON()],
      total: 3,
      currentPage: 1,
      lastPage: 1,
      perPage: 3,
    })
  })
})
