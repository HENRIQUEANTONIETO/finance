import { InvoiceBankDataBuilder } from '@/invoice/domain/testing/helpers/invoice-bank-data-builder'
import {
  InvoiceBankRules,
  InvoiceBankValidator,
  InvoiceBankValidatorFactory,
} from '../../invoice-bank.validator'

const props = InvoiceBankDataBuilder()
let sut: InvoiceBankValidator
describe('InvoiceBankEntity validator unit test', () => {
  beforeEach(() => {
    sut = InvoiceBankValidatorFactory.create()
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

  it('Validation cases for invoice-bank', () => {
    let isValid = sut.validate(props)
    expect(isValid).toBeTruthy()
    expect(sut.validatedData).toStrictEqual(new InvoiceBankRules(props))

    isValid = sut.validate({ ...props, typeField: undefined })
    expect(isValid).toBeTruthy()
    expect(sut.validatedData).toStrictEqual(
      new InvoiceBankRules({
        ...props,
        type: undefined,
      }),
    )
  })
})
