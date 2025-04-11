import { InvoiceItemDataBuilder } from '@/invoice-item/domain/testing/helpers/invoice-item-data-builder'
import { InvoiceItemEntity, InvoiceItemProps } from '../../invoice-item.entity'

describe('InvoiceItemEntity unit tests', () => {
  let invoiceItemProps: InvoiceItemProps
  let sut: InvoiceItemEntity

  beforeEach(() => {
    invoiceItemProps = InvoiceItemDataBuilder()
    InvoiceItemEntity.validate = jest.fn()
    sut = new InvoiceItemEntity(invoiceItemProps)
  })

  it('should instance InvoiceItemEntity', () => {
    expect(InvoiceItemEntity.validate).toHaveBeenCalled()
    expect(sut.props.title).toBe(invoiceItemProps.title)
    expect(sut.props.amount).toBe(invoiceItemProps.amount)
    expect(sut.props.category).toBe(invoiceItemProps.category)
    expect(sut.props.date).toBe(invoiceItemProps.date)
    expect(sut.props.type).toBe(invoiceItemProps.type)
  })

  it('should return getter of title field', () => {
    expect(sut.title).toBeDefined()
    expect(sut.title).toEqual(invoiceItemProps.title)
    expect(typeof sut.title).toBe('string')
  })

  it('should return getter of category field', () => {
    expect(sut.category).toBeDefined()
    expect(sut.category).toEqual(invoiceItemProps.category)
    expect(typeof sut.category).toBe('string')
  })

  it('should return getter of type field', () => {
    expect(sut.type).toBeDefined()
    expect(sut.type).toEqual(invoiceItemProps.type)
    expect(typeof sut.type).toBe('string')
  })

  it('should return getter of amount field', () => {
    expect(sut.amount).toBeDefined()
    expect(sut.amount).toEqual(invoiceItemProps.amount)
    expect(typeof sut.amount).toBe('number')
  })

  it('should return getter of date field', () => {
    expect(sut.date).toBeDefined()
    expect(sut.date).toBeInstanceOf(Date)
  })
})
