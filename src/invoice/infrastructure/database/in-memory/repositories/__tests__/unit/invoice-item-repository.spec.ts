import { InvoiceItemEntity } from '@/invoice/domain/entities/invoice-item.entity'
import { InvoiceItemInMemoryRepository } from '../../invoice-item.repository'
import { ConflictError } from '@/shared/domain/errors/conflict-error'
import { InvoiceItemDataBuilder } from '@/invoice/domain/testing/helpers/invoice-item-data-builder'

describe('InvoiceItemInMemoryRepository unit tests', () => {
  let sut: InvoiceItemInMemoryRepository
  beforeEach(() => {
    sut = new InvoiceItemInMemoryRepository()
  })

  it('Should no filter items when filter object is null', async () => {
    const entity = new InvoiceItemEntity(InvoiceItemDataBuilder())
    await sut.insert(entity)
    const result = await sut.findAll()
    const spyFilter = jest.spyOn(result, 'filter')
    const itemsFiltered = await sut['applyFilter'](result, null)
    expect(spyFilter).not.toHaveBeenCalled()
    expect(itemsFiltered).toStrictEqual(result)
  })

  it('Should filter date field using filter param', async () => {
    const items = [
      new InvoiceItemEntity(InvoiceItemDataBuilder({ date: new Date('06/06/2025') })),
      new InvoiceItemEntity(InvoiceItemDataBuilder({ date: new Date('04/06/2025') })),
      new InvoiceItemEntity(InvoiceItemDataBuilder({ date: new Date('05/06/2024') })),
    ]
    const spyFilter = jest.spyOn(items, 'filter')
    const itemsFiltered = await sut['applyFilter'](items, '2025')
    expect(spyFilter).toHaveBeenCalled()
    expect(itemsFiltered).toStrictEqual([items[0], items[1]])
  })

  it('Should sort by date when sort param is null', async () => {
    const items = [
      new InvoiceItemEntity(InvoiceItemDataBuilder({ date: new Date('06/04/2025') })),
      new InvoiceItemEntity(
        InvoiceItemDataBuilder({
          date: new Date('06/05/2025'),
        }),
      ),
      new InvoiceItemEntity(
        InvoiceItemDataBuilder({
          date: new Date('07/08/2024'),
        }),
      ),
    ]
    const itemsSorted = await sut['applySort'](items, null, null)
    expect(itemsSorted).toStrictEqual([items[1], items[0], items[2]])
  })

  it('Should sort by date and asc direction', async () => {
    const items = [
      new InvoiceItemEntity(InvoiceItemDataBuilder({ date: new Date('06/04/2025') })),
      new InvoiceItemEntity(
        InvoiceItemDataBuilder({
          date: new Date('06/05/2025'),
        }),
      ),
      new InvoiceItemEntity(
        InvoiceItemDataBuilder({
          date: new Date('07/08/2024'),
        }),
      ),
    ]
    const itemsSorted = await sut['applySort'](items, 'date', 'asc')
    expect(itemsSorted).toStrictEqual([items[2], items[0], items[1]])
  })

  it('Should sort by title and asc direction', async () => {
    const items = [
      new InvoiceItemEntity(InvoiceItemDataBuilder({ title: 'bTeste' })),
      new InvoiceItemEntity(
        InvoiceItemDataBuilder({
          title: 'aTeste',
        }),
      ),
      new InvoiceItemEntity(
        InvoiceItemDataBuilder({
          title: 'cTeste',
        }),
      ),
    ]
    const itemsSorted = await sut['applySort'](items, 'title', 'asc')
    expect(itemsSorted).toStrictEqual([items[1], items[0], items[2]])
  })
})
