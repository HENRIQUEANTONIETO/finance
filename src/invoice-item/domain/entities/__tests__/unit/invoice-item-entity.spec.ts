import { InvoiceItemDataBuilder } from '@/invoice-item/domain/testing/helpers/invoice-item-data-builder'
import { InvoiceItemEntity } from '../../invoice-item.entity'

describe('InvoiceItemEntity entity unit test', () => {
  const props = InvoiceItemDataBuilder()
  InvoiceItemEntity.validate = jest.fn()
  const sut = new InvoiceItemEntity(props)

  it('Should instance InvoiceItemEntity', () => {
    expect(InvoiceItemEntity.validate).toHaveBeenCalled()
    expect(sut.title).toBe(props.title)
    expect(sut.amount).toBe(props.amount)
    expect(sut.category).toBe(props.category)
    expect(sut.date).toBe(props.date)
    expect(sut.type).toBe(props.type)
  })
})
