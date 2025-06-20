import { InvoiceInMemoryRepository } from '@/invoice/infrastructure/database/in-memory/repositories/invoice.repository'
import { ListInvoiceUseCase } from '../../list-invoice.usecase'
import { InvoiceRepository } from '@/invoice/domain/repositories/invoice.repository'
import { InvoiceEntity } from '@/invoice/domain/entities/invoice.entity'
import { InvoiceDataBuilder } from '@/invoice/domain/testing/helpers/invoice-data-builder'
import { BadRequestError } from '@/shared/application/errors/bad-request-error'

describe('ListInvoiceUseCase unit tests', () => {
  let sut: ListInvoiceUseCase.UseCase
  let repository: InvoiceInMemoryRepository

  beforeEach(() => {
    repository = new InvoiceInMemoryRepository()
    sut = new ListInvoiceUseCase.UseCase(repository)
  })

  it('toOutput method', () => {
    let result = new InvoiceRepository.SearchResult({
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

    const entity = new InvoiceEntity(InvoiceDataBuilder({}))
    result = new InvoiceRepository.SearchResult({
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

  it('Should throw error when year not provided', async () => {
    const invalidParams = [null, '', {}, { year: null }, { year: '' }]

    invalidParams.forEach(async invalidParam => {
      await expect(() => sut.execute(invalidParam as any)).rejects.toThrow(
        new BadRequestError('year not provided'),
      )
    })
  })

  it('Should just return invoices with the same input year', async () => {
    const items = [
      new InvoiceEntity(InvoiceDataBuilder({ year: 2024 })),
      new InvoiceEntity(InvoiceDataBuilder({ year: 2025 })),
      new InvoiceEntity(InvoiceDataBuilder({ year: 2023 })),
      new InvoiceEntity(InvoiceDataBuilder({ year: 2025 })),
    ]

    repository.items = items

    const result = await sut.execute({ year: 2025 })

    expect(result).toStrictEqual({
      items: [items[1], items[3]].map(item => item.toJSON()),
      total: 2,
      currentPage: 1,
      lastPage: 1,
      perPage: 15,
    })
  })

  it('should return the invoices ordered by month', async () => {
    const items = [
      new InvoiceEntity(InvoiceDataBuilder({ month: 1 })),
      new InvoiceEntity(InvoiceDataBuilder({ month: 2 })),
      new InvoiceEntity(InvoiceDataBuilder({ month: 3 })),
    ]
    repository.items = items
    const output = await sut.execute({ year: 2025 })
    expect(output).toStrictEqual({
      items: [...items].reverse().map(item => item.toJSON()),
      total: 3,
      currentPage: 1,
      lastPage: 1,
      perPage: 15,
    })
  })

  it('should return the layouts using pagination and sort', async () => {
    const items = [
      new InvoiceEntity(InvoiceDataBuilder({ year: 2025, month: 5 })),
      new InvoiceEntity(InvoiceDataBuilder({ year: 2024, month: 4 })),
      new InvoiceEntity(InvoiceDataBuilder({ year: 2025, month: 3 })),
      new InvoiceEntity(InvoiceDataBuilder({ year: 2023, month: 2 })),
      new InvoiceEntity(InvoiceDataBuilder({ year: 2024, month: 1 })),
    ]
    repository.items = items
    let output = await sut.execute({
      page: 1,
      perPage: 2,
      sort: 'month',
      sortDir: 'asc',
      year: 2024,
    })
    expect(output).toStrictEqual({
      items: [items[4].toJSON(), items[1].toJSON()],
      total: 2,
      currentPage: 1,
      lastPage: 1,
      perPage: 2,
    })

    output = await sut.execute({
      page: 1,
      perPage: 2,
      sort: 'month',
      sortDir: 'asc',
      year: 2023,
    })
    expect(output).toStrictEqual({
      items: [items[3].toJSON()],
      total: 1,
      currentPage: 1,
      lastPage: 1,
      perPage: 2,
    })

    output = await sut.execute({
      page: 1,
      perPage: 2,
      sort: 'month',
      sortDir: 'desc',
      year: 2025,
    })
    expect(output).toStrictEqual({
      items: [items[0].toJSON(), items[2].toJSON()],
      total: 2,
      currentPage: 1,
      lastPage: 1,
      perPage: 2,
    })
  })
})
