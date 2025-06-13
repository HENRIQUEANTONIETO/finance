import { InvoiceInMemoryRepository } from '@/invoice/infrastructure/database/in-memory/repositories/invoice.repository'
import { UpdateInvoiceUseCase } from '../../update-invoice.usecase'
import { InvoiceDataBuilder } from '@/invoice/domain/testing/helpers/invoice-data-builder'
import { InvoiceEntity } from '@/invoice/domain/entities/invoice.entity'

describe('UpdateInvoiceUseCase unit test', () => {
  let repository: InvoiceInMemoryRepository
  let sut: UpdateInvoiceUseCase.UseCase
  beforeEach(() => {
    repository = new InvoiceInMemoryRepository()
    sut = new UpdateInvoiceUseCase.UseCase(repository)
  })

  it('Should update the month of an invoice', async () => {
    const spyUpdate = jest.spyOn(repository, 'update')
    const props = InvoiceDataBuilder()
    const items = [new InvoiceEntity(props)]
    repository.items = items

    const result = await sut.execute({
      id: items[0].id,
      month: 7,
    })
    expect(spyUpdate).toHaveBeenCalledTimes(1)
    expect(result).toStrictEqual({ ...items[0].toJSON(), month: 7 })
  })

  it('Should not update the month if the value is null', async () => {
    const spyUpdate = jest.spyOn(repository, 'update')
    const props = InvoiceDataBuilder({ month: 5 })
    const items = [new InvoiceEntity(props)]
    repository.items = items

    const result = await sut.execute({
      id: items[0].id,
      month: null,
    })
    expect(spyUpdate).toHaveBeenCalledTimes(1)
    expect(result).toStrictEqual({ ...items[0].toJSON(), month: 5 })
  })

  it('Should update the year of an invoice', async () => {
    const spyUpdate = jest.spyOn(repository, 'update')
    const props = InvoiceDataBuilder({ year: 2024 })
    const items = [new InvoiceEntity(props)]
    repository.items = items

    const result = await sut.execute({
      id: items[0].id,
      year: 2025,
    })
    expect(spyUpdate).toHaveBeenCalledTimes(1)
    expect(result).toStrictEqual({ ...items[0].toJSON(), year: 2025 })
  })

  it('Should not update the year if the value is null', async () => {
    const spyUpdate = jest.spyOn(repository, 'update')
    const props = InvoiceDataBuilder({ year: 2026 })
    const items = [new InvoiceEntity(props)]
    repository.items = items

    const result = await sut.execute({
      id: items[0].id,
      year: null,
    })
    expect(spyUpdate).toHaveBeenCalledTimes(1)
    expect(result).toStrictEqual({ ...items[0].toJSON(), year: 2026 })
  })

  it('Should update the month and the year of an invoice', async () => {
    const spyUpdate = jest.spyOn(repository, 'update')
    const props = InvoiceDataBuilder({ month: 5, year: 2024 })
    const items = [new InvoiceEntity(props)]
    repository.items = items

    const result = await sut.execute({
      id: items[0].id,
      month: 1,
      year: 2025,
    })
    expect(spyUpdate).toHaveBeenCalledTimes(1)
    expect(result).toStrictEqual({ ...items[0].toJSON(), month: 1, year: 2025 })
  })
})
