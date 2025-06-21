import { InvoiceInMemoryRepository } from '@/invoice/infrastructure/database/in-memory/repositories/invoice.repository'
import { DeleteInvoiceUseCase } from '../../delete-invoice.usecase'
import { InvoiceEntity } from '@/invoice/domain/entities/invoice.entity'
import { InvoiceDataBuilder } from '@/invoice/domain/testing/helpers/invoice-data-builder'
import { NotFoundError } from '@/shared/domain/errors/not-found-error'

describe('DeleteInvoiceUseCase unit tests', () => {
  let sut: DeleteInvoiceUseCase.UseCase
  let repository: InvoiceInMemoryRepository

  beforeEach(() => {
    repository = new InvoiceInMemoryRepository()
    sut = new DeleteInvoiceUseCase.UseCase(repository)
  })

  it('Should delete an invoice', async () => {
    const spyDelete = jest.spyOn(repository, 'delete')
    const items = [new InvoiceEntity(InvoiceDataBuilder())]

    repository.items = items
    expect(repository.items).toHaveLength(1)
    await sut.execute({ id: items[0]._id })
    expect(spyDelete).toHaveBeenCalledTimes(1)
    expect(repository.items).toHaveLength(0)
  })

  it('Should throw an error when entity not found', async () => {
    await expect(sut.execute({ id: 'fakeID' })).rejects.toThrow(
      new NotFoundError('Entity Invoice not found'),
    )
  })
})
