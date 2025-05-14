import { BankDataBuilder } from '@/bank/domain/testing/helpers/bank-data-builder'
import { BankRules, BankValidator, BankValidatorFactory } from '../../bank.validator'

const props = BankDataBuilder()
let sut: BankValidator
describe('BankEntity validator unit test', () => {
  beforeEach(() => {
    sut = BankValidatorFactory.create()
  })

  const fieldsRequired = [
    'name',
    'titleField',
    'categoryField',
    'amountField',
    'dateField',
  ]

  it.each(fieldsRequired)('Invalidation cases for %s field', field => {
    let isValid = sut.validate({ ...props, [field]: '' })
    expect(isValid).toBeFalsy()
    expect(sut.errors[field]).toStrictEqual([field + ' should not be empty'])

    isValid = sut.validate({ ...props, [field]: null })
    expect(isValid).toBeFalsy()
    expect(sut.errors[field]).toStrictEqual([
      field + ' should not be empty',
      field + ' must be a string',
      field + ' must be shorter than or equal to 255 characters',
    ])

    isValid = sut.validate({ ...props, [field]: 10 as any })
    expect(isValid).toBeFalsy()
    expect(sut.errors[field]).toStrictEqual([
      field + ' must be a string',
      field + ' must be shorter than or equal to 255 characters',
    ])

    isValid = sut.validate({ ...props, [field]: 'a'.repeat(256) })
    expect(isValid).toBeFalsy()
    expect(sut.errors[field]).toStrictEqual([
      field + ' must be shorter than or equal to 255 characters',
    ])
  })

  it('Invalidation cases for typeField field', () => {
    let isValid = sut.validate({ ...props, typeField: 10 as any })
    expect(isValid).toBeFalsy()
    expect(sut.errors.typeField).toStrictEqual([
      'typeField must be a string',
      'typeField must be shorter than or equal to 255 characters',
    ])

    isValid = sut.validate({ ...props, typeField: 'a'.repeat(256) })
    expect(isValid).toBeFalsy()
    expect(sut.errors.typeField).toStrictEqual([
      'typeField must be shorter than or equal to 255 characters',
    ])
  })

  it('Validation cases for bank', () => {
    let isValid = sut.validate(props)
    expect(isValid).toBeTruthy()
    expect(sut.validatedData).toStrictEqual(new BankRules(props))

    isValid = sut.validate({ ...props, typeField: undefined })
    expect(isValid).toBeTruthy()
    expect(sut.validatedData).toStrictEqual(
      new BankRules({
        ...props,
        typeField: undefined,
      }),
    )
  })
})
