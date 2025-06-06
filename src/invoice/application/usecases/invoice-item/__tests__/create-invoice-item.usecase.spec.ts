import { InvoiceItemDataBuilder } from '@/invoice/domain/testing/helpers/invoice-item-data-builder'
import { CreateInvoiceItemUseCase } from '../create-invoice-item.usecase'
import { InvoiceItemInMemoryRepository } from '@/invoice/infrastructure/database/in-memory/repositories/invoice-item.repository'

describe('CreateInvoiceItemUseCase unit test', () => {
  it('Should create an invoice-item', async () => {
    const repository = new InvoiceItemInMemoryRepository()
    const sut = new CreateInvoiceItemUseCase.UseCase(repository)
    const spyInsert = jest.spyOn(repository, 'insert')
    const props = InvoiceItemDataBuilder()
    const result = await sut.execute(props)
    expect(repository.items).toHaveLength(1)
    expect(result.id).toBeDefined()
    expect(spyInsert).toHaveBeenCalledTimes(1)
  })
})
