import { InvoiceEntity } from '@/invoice/domain/entities/invoice.entity'
import { InvoiceInMemoryRepository } from '../../invoice.repository'
import { InvoiceDataBuilder } from '@/invoice/domain/testing/helpers/invoice-data-builder'

describe('InvoiceInMemoryRepository unit tests', () => {
  let sut: InvoiceInMemoryRepository
  beforeEach(() => {
    sut = new InvoiceInMemoryRepository()
  })

  it('Should no filter items when filter object is null', async () => {
    const entity = new InvoiceEntity(InvoiceDataBuilder())
    await sut.insert(entity)
    const result = await sut.findAll()
    const spyFilter = jest.spyOn(result, 'filter')
    const itemsFiltered = await sut['applyFilter'](result, null)
    expect(spyFilter).not.toHaveBeenCalled()
    expect(itemsFiltered).toStrictEqual(result)
  })

  it('Should filter by year using filter param', async () => {
    const items = [
      new InvoiceEntity(InvoiceDataBuilder({ year: 2023 })),
      new InvoiceEntity(InvoiceDataBuilder({ year: 2025 })),
      new InvoiceEntity(InvoiceDataBuilder({ year: 2024 })),
    ]
    const spyFilter = jest.spyOn(items, 'filter')
    const itemsFiltered = await sut['applyFilter'](items, 2025)

    expect(spyFilter).toHaveBeenCalled()
    expect(itemsFiltered).toStrictEqual([items[1]])
  })

  it('Should sort by month when sort param is null', async () => {
    const items = [
      new InvoiceEntity(InvoiceDataBuilder({ month: 2 })),
      new InvoiceEntity(InvoiceDataBuilder({ month: 1 })),
      new InvoiceEntity(InvoiceDataBuilder({ month: 3 })),
    ]
    const itemsSorted = await sut['applySort'](items, null, null)
    expect(itemsSorted).toStrictEqual([items[2], items[0], items[1]])
  })

  it('Should sort by month and asc direction', async () => {
    const items = [
      new InvoiceEntity(InvoiceDataBuilder({ month: 2 })),
      new InvoiceEntity(InvoiceDataBuilder({ month: 1 })),
      new InvoiceEntity(InvoiceDataBuilder({ month: 3 })),
    ]
    const itemsSorted = await sut['applySort'](items, 'month', 'asc')
    expect(itemsSorted).toStrictEqual([items[1], items[0], items[2]])
  })
})
