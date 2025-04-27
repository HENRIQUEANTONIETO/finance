import { InvoiceBankDataBuilder } from '@/invoice/domain/testing/helpers/invoice-bank-data-builder'
import { InvoiceBankEntity, InvoiceBankProps } from '../../invoice-bank.entity'

describe('InvoiceBankEntity unit tests', () => {
  let InvoiceBankProps: InvoiceBankProps
  let sut: InvoiceBankEntity

  beforeEach(() => {
    InvoiceBankProps = InvoiceBankDataBuilder()
    InvoiceBankEntity.validate = jest.fn()
    sut = new InvoiceBankEntity(InvoiceBankProps)
  })

  it('should instance InvoiceBankEntity', () => {
    expect(InvoiceBankEntity.validate).toHaveBeenCalled()
    expect(sut.name).toBe(InvoiceBankProps.name)
    expect(sut.titleField).toBe(InvoiceBankProps.titleField)
    expect(sut.amountField).toBe(InvoiceBankProps.amountField)
    expect(sut.categoryField).toBe(InvoiceBankProps.categoryField)
    expect(sut.dateField).toBe(InvoiceBankProps.dateField)
    expect(sut.typeField).toBe(InvoiceBankProps.typeField)
  })

  it('should return getter of titleField field', () => {
    expect(sut.titleField).toBeDefined()
    expect(sut.titleField).toEqual(InvoiceBankProps.titleField)
    expect(typeof sut.titleField).toBe('string')
  })

  it('should return getter of categoryField field', () => {
    expect(sut.categoryField).toBeDefined()
    expect(sut.categoryField).toEqual(InvoiceBankProps.categoryField)
    expect(typeof sut.categoryField).toBe('string')
  })

  it('should return getter of typeField field', () => {
    expect(sut.typeField).toBeDefined()
    expect(sut.typeField).toEqual(InvoiceBankProps.typeField)
    expect(typeof sut.typeField).toBe('string')
  })

  it('should return getter of amountField field', () => {
    expect(sut.amountField).toBeDefined()
    expect(sut.amountField).toEqual(InvoiceBankProps.amountField)
    expect(typeof sut.amountField).toBe('string')
  })

  it('should return getter of dateField field', () => {
    expect(sut.dateField).toBeDefined()
    expect(sut.dateField).toEqual(InvoiceBankProps.dateField)
    expect(typeof sut.dateField).toBe('string')
  })
})
