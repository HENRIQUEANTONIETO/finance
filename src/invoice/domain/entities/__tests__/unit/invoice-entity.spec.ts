import { InvoiceDataBuilder } from '@/invoice/domain/testing/helpers/invoice-data-builder'
import { InvoiceEntity, InvoiceProps } from '../../invoice.entity'

describe('InvoiceEntity unit tests', () => {
  let invoiceProps: InvoiceProps
  let sut: InvoiceEntity

  beforeEach(() => {
    invoiceProps = InvoiceDataBuilder()
    InvoiceEntity.validate = jest.fn()
    sut = new InvoiceEntity(invoiceProps)
  })

  it('should instance InvoiceEntity', () => {
    expect(InvoiceEntity.validate).toHaveBeenCalled()
    expect(sut.bank).toBe(invoiceProps.bank)
    expect(sut.month).toBe(invoiceProps.month)
    expect(sut.year).toBe(invoiceProps.year)
    expect(sut.importedAt).toBe(invoiceProps.importedAt)
    expect(sut.items).toBe(invoiceProps.items)
  })

  it('should return getter of bank field', () => {
    expect(sut.bank).toBeDefined()
    expect(sut.bank).toEqual(invoiceProps.bank)
    expect(typeof sut.bank).toBe('string')
  })

  it('should return getter of month field', () => {
    expect(sut.month).toBeDefined()
    expect(sut.month).toEqual(invoiceProps.month)
    expect(typeof sut.month).toBe('number')
  })

  it('should return getter of year field', () => {
    expect(sut.year).toBeDefined()
    expect(sut.year).toEqual(invoiceProps.year)
    expect(typeof sut.year).toBe('number')
  })

  it('should return getter of importedAt field', () => {
    expect(sut.importedAt).toBeDefined()
    expect(sut.importedAt).toBeInstanceOf(Date)
  })

  it('should return list of invoice items', () => {
    expect(sut.items).toBeDefined()
    expect(typeof sut.items).toBe('object')
  })

  it('should return the total amount of all invoice items', () => {
    const expectedTotal = sut.items.reduce((acc, item) => acc + item.amount, 0)
    expect(sut.getTotal()).toBe(expectedTotal)
  })

  it('should return 0 if there are no items', () => {
    const emptyInvoice = new InvoiceEntity({ ...invoiceProps, items: [] })
    expect(emptyInvoice.getTotal()).toBe(0)
  })

  it('Should update month and validate', () => {
    sut.month = 5
    expect(sut.month).toBe(5)
    expect(InvoiceEntity.validate).toHaveBeenCalled()
  })

  it('Should update year and validate', () => {
    sut.year = 2026
    expect(sut.year).toBe(2026)
    expect(InvoiceEntity.validate).toHaveBeenCalled()
  })
})
