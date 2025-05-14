import { BankDataBuilder } from '@/bank/domain/testing/helpers/bank-data-builder'
import { BankEntity, BankProps } from '../../bank.entity'

describe('BankEntity unit tests', () => {
  let BankProps: BankProps
  let sut: BankEntity

  beforeEach(() => {
    BankProps = BankDataBuilder()
    BankEntity.validate = jest.fn()
    sut = new BankEntity(BankProps)
  })

  it('should instance BankEntity', () => {
    expect(BankEntity.validate).toHaveBeenCalled()
    expect(sut.name).toBe(BankProps.name)
    expect(sut.titleField).toBe(BankProps.titleField)
    expect(sut.amountField).toBe(BankProps.amountField)
    expect(sut.categoryField).toBe(BankProps.categoryField)
    expect(sut.dateField).toBe(BankProps.dateField)
    expect(sut.typeField).toBe(BankProps.typeField)
  })

  it('should return getter of titleField field', () => {
    expect(sut.titleField).toBeDefined()
    expect(sut.titleField).toEqual(BankProps.titleField)
    expect(typeof sut.titleField).toBe('string')
  })

  it('should return getter of categoryField field', () => {
    expect(sut.categoryField).toBeDefined()
    expect(sut.categoryField).toEqual(BankProps.categoryField)
    expect(typeof sut.categoryField).toBe('string')
  })

  it('should return getter of typeField field', () => {
    expect(sut.typeField).toBeDefined()
    expect(sut.typeField).toEqual(BankProps.typeField)
    expect(typeof sut.typeField).toBe('string')
  })

  it('should return getter of amountField field', () => {
    expect(sut.amountField).toBeDefined()
    expect(sut.amountField).toEqual(BankProps.amountField)
    expect(typeof sut.amountField).toBe('string')
  })

  it('should return getter of dateField field', () => {
    expect(sut.dateField).toBeDefined()
    expect(sut.dateField).toEqual(BankProps.dateField)
    expect(typeof sut.dateField).toBe('string')
  })
})
