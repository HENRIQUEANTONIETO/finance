import { InvoiceInMemoryRepository } from '@/invoice/infrastructure/database/in-memory/repositories/invoice.repository'
import { CreateInvoiceUseCase } from '../../create-invoice.usecase'
import { InvoiceDataBuilder } from '@/invoice/domain/testing/helpers/invoice-data-builder'
import { LayoutInMemoryRepository } from '@/layout/infrastructure/database/in-memory/repositories/layout-in-memory.repository'
import { LayoutEntity } from '@/layout/domain/entities/layout.entity'
import { LayoutDataBuilder } from '@/layout/domain/testing/helpers/layout-data-builder'
import { ConflictError } from '@/shared/domain/errors/conflict-error'

describe('CreateInvoiceUseCase unit test', () => {
  let repository: InvoiceInMemoryRepository
  let layoutRepository: LayoutInMemoryRepository
  let sut: CreateInvoiceUseCase.UseCase
  let layoutItems: LayoutEntity[]
  beforeEach(() => {
    repository = new InvoiceInMemoryRepository()
    layoutRepository = new LayoutInMemoryRepository()
    layoutItems = [new LayoutEntity(LayoutDataBuilder())]
    layoutRepository.items = layoutItems
    sut = new CreateInvoiceUseCase.UseCase(repository, layoutRepository)
  })

  it('Should valid toInvoiceItemEntity method', async () => {
    const items = [
      {
        Data: '27/04/2025',
        Lançamento: 'UBA PETRO LTDA',
        Categoria: 'TRANSPORTE',
        Tipo: 'Compra à vista',
        Valor: 'R$ 126,39',
      },
    ]
    const result = await sut['toInvoiceItemEntity'](items, layoutItems[0].id)

    expect(result[0].id).toBeDefined()
    expect(result[0].title).toBe(items[0].Lançamento)
    expect(result[0].date).toBeInstanceOf(Date)
    expect(result[0].category).toBe(items[0].Categoria)
    expect(result[0].type).toBe(items[0].Tipo)
    expect(result[0].amount).toBeCloseTo(126.39)
  })

  it('Should create an invoice', async () => {
    const spyInsert = jest.spyOn(repository, 'insert')

    const items = [
      {
        Data: '2024-07-24',
        Lançamento: 'UBA PETRO LTDA',
        Categoria: 'TRANSPORTE',
        Valor: 316.7,
      },
    ]

    const invoice = InvoiceDataBuilder({ layoutId: layoutItems[0].id })

    const result = await sut.execute({ ...invoice, items })

    expect(repository.items).toHaveLength(1)
    expect(repository.items[0].items).toHaveLength(1)
    expect(result.id).toBeDefined()
    expect(spyInsert).toHaveBeenCalledTimes(1)
  })

  it('Should not create an invoice with same month, year and invoice id', async () => {
    const items = [
      {
        Data: '2024-07-24',
        Lançamento: 'UBA PETRO LTDA',
        Categoria: 'TRANSPORTE',
        Valor: 316.7,
      },
    ]

    const invoice = InvoiceDataBuilder({ layoutId: layoutItems[0].id })

    await sut.execute({ ...invoice, items })

    await expect(() => sut.execute({ ...invoice, items })).rejects.toBeInstanceOf(
      ConflictError,
    )
  })

  it('Should create an invoice with same year and invoice id but different month', async () => {
    const spyInsert = jest.spyOn(repository, 'insert')
    const items = [
      {
        Data: '2024-07-24',
        Lançamento: 'UBA PETRO LTDA',
        Categoria: 'TRANSPORTE',
        Valor: 316.7,
      },
    ]

    const invoice = InvoiceDataBuilder({ layoutId: layoutItems[0].id })

    await sut.execute({ ...invoice, items })

    const result = await sut.execute({ ...invoice, month: 5, items })
    expect(repository.items).toHaveLength(2)
    expect(repository.items[0].items).toHaveLength(1)
    expect(repository.items[1].items).toHaveLength(1)
    expect(result.id).toBeDefined()
    expect(spyInsert).toHaveBeenCalledTimes(2)
  })
})
