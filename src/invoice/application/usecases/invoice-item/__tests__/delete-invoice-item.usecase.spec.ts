import { InvoiceItemDataBuilder } from '@/invoice/domain/testing/helpers/invoice-item-data-builder'
import { InvoiceItemInMemoryRepository } from '@/invoice/infrastructure/database/in-memory/repositories/invoice-item.repository'
import { DeleteInvoiceItemUseCase } from '../delete-invoice-item.usecase'
import { InvoiceItemEntity } from '@/invoice/domain/entities/invoice-item.entity'
import { NotFoundError } from '@/shared/domain/errors/not-found-error'

describe('DeleteInvoiceItemUseCase unit test', () => {
  let sut: DeleteInvoiceItemUseCase.UseCase
  let repository: InvoiceItemInMemoryRepository
  beforeEach(() => {
    repository = new InvoiceItemInMemoryRepository()
    sut = new DeleteInvoiceItemUseCase.UseCase(repository)
  })

  it('Should delete an invoice-item', async () => {
    const props = InvoiceItemDataBuilder()
    const items = [new InvoiceItemEntity(props)]
    repository.items = items

    const spyDelete = jest.spyOn(repository, 'delete')
    expect(repository.items).toHaveLength(1)
    await sut.execute({ id: items[0].id })
    expect(repository.items).toHaveLength(0)
    expect(spyDelete).toHaveBeenCalledTimes(1)
  })

  it('Should throw an error when entity not found', async () => {
    await expect(sut.execute({ id: 'fakeID' })).rejects.toThrow(
      new NotFoundError('Entity not found'),
    )
  })
})
