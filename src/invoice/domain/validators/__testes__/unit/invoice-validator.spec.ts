import { InvoiceDataBuilder } from '@/invoice/domain/testing/helpers/invoice-data-builder'
import {
  InvoiceRules,
  InvoiceValidator,
  InvoiceValidatorFactory,
} from '../../Invoice.validator'

const props = InvoiceDataBuilder()
let sut: InvoiceValidator
describe('InvoiceEntity validator unit test', () => {
  beforeEach(() => {
    sut = InvoiceValidatorFactory.create()
  })
  it('Invalidation cases for layoutId field', () => {
    let isValid = sut.validate({ ...props, layoutId: '' as any })
    expect(isValid).toBeFalsy()
    expect(sut.errors.layoutId).toStrictEqual(['layoutId should not be empty'])

    isValid = sut.validate({ ...props, layoutId: null })
    expect(isValid).toBeFalsy()
    expect(sut.errors.layoutId).toStrictEqual([
      'layoutId must be a string',
      'layoutId should not be empty',
    ])

    isValid = sut.validate({ ...props, layoutId: 10 as any })
    expect(isValid).toBeFalsy()
    expect(sut.errors.layoutId).toStrictEqual(['layoutId must be a string'])

    isValid = sut.validate({ ...props, layoutId: [] as any })
    expect(isValid).toBeFalsy()
    expect(sut.errors.layoutId).toStrictEqual(['layoutId must be a string'])

    isValid = sut.validate({ ...props, layoutId: {} as any })
    expect(isValid).toBeFalsy()
    expect(sut.errors.layoutId).toStrictEqual(['layoutId must be a string'])
  })

  it('Invalidation cases for month field', () => {
    let isValid = sut.validate({ ...props, month: '' as any })
    expect(isValid).toBeFalsy()
    expect(sut.errors.month).toStrictEqual([
      'month must not be greater than 12',
      'month must not be less than 1',
      'month must be an integer number',
    ])

    isValid = sut.validate({ ...props, month: null })
    expect(isValid).toBeFalsy()
    expect(sut.errors.month).toStrictEqual([
      'month must not be greater than 12',
      'month must not be less than 1',
      'month must be an integer number',
    ])

    isValid = sut.validate({ ...props, month: -5 })
    expect(isValid).toBeFalsy()
    expect(sut.errors.month).toStrictEqual(['month must not be less than 1'])

    isValid = sut.validate({ ...props, month: 15 })
    expect(isValid).toBeFalsy()
    expect(sut.errors.month).toStrictEqual(['month must not be greater than 12'])
  })

  it('Invalidation cases for year field', () => {
    let isValid = sut.validate({ ...props, year: '' as any })
    expect(isValid).toBeFalsy()
    expect(sut.errors.year).toStrictEqual([
      'year must not be less than 2000',
      'year must be an integer number',
    ])

    isValid = sut.validate({ ...props, year: null })
    expect(isValid).toBeFalsy()
    expect(sut.errors.year).toStrictEqual([
      'year must not be less than 2000',
      'year must be an integer number',
    ])

    isValid = sut.validate({ ...props, year: 1999 })
    expect(isValid).toBeFalsy()
    expect(sut.errors.year).toStrictEqual(['year must not be less than 2000'])
  })

  it('Invalidation cases for importedAt field', () => {
    let isValid = sut.validate({ ...props, importedAt: '' as any })
    expect(isValid).toBeFalsy()
    expect(sut.errors.importedAt).toStrictEqual(['importedAt must be a Date instance'])

    isValid = sut.validate({ ...props, importedAt: 'data' as any })
    expect(isValid).toBeFalsy()
    expect(sut.errors.importedAt).toStrictEqual(['importedAt must be a Date instance'])

    isValid = sut.validate({ ...props, importedAt: 10 as any })
    expect(isValid).toBeFalsy()
    expect(sut.errors.importedAt).toStrictEqual(['importedAt must be a Date instance'])
  })

  it('Invalidation cases for items field', () => {
    let isValid = sut.validate({ ...props, items: '' as any })
    expect(isValid).toBeFalsy()
    expect(sut.errors.items).toStrictEqual([
      'items should not be empty',
      'items must be an array',
      'each value in nested property items must be either object or array',
    ])

    isValid = sut.validate({ ...props, items: null })
    expect(isValid).toBeFalsy()
    expect(sut.errors.items).toStrictEqual([
      'items should not be empty',
      'items must be an array',
      'each value in nested property items must be either object or array',
    ])

    isValid = sut.validate({ ...props, items: 10 as any })
    expect(isValid).toBeFalsy()
    expect(sut.errors.items).toStrictEqual([
      'items should not be empty',
      'items must be an array',
      'each value in nested property items must be either object or array',
    ])

    isValid = sut.validate({ ...props, items: [] })
    expect(isValid).toBeFalsy()
    expect(sut.errors.items).toStrictEqual(['items should not be empty'])

    isValid = sut.validate({ ...props, items: {} as any })
    expect(isValid).toBeFalsy()
    expect(sut.errors.items).toStrictEqual([
      'items should not be empty',
      'items must be an array',
    ])
  })

  it('Validation cases for Invoice', () => {
    let isValid = sut.validate(props)
    expect(isValid).toBeTruthy()
    expect(sut.validatedData).toStrictEqual(new InvoiceRules(props))
  })
})
