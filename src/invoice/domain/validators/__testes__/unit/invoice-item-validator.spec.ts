import { InvoiceItemDataBuilder } from '@/invoice/domain/testing/helpers/invoice-item-data-builder'
import {
  InvoiceItemRules,
  InvoiceItemValidator,
  InvoiceItemValidatorFactory,
} from '../../invoice-item.validator'

const props = InvoiceItemDataBuilder()
let sut: InvoiceItemValidator
describe('InvoiceItemEntity validator unit test', () => {
  beforeEach(() => {
    sut = InvoiceItemValidatorFactory.create()
  })
  it('Invalidation cases for title field', () => {
    let isValid = sut.validate({ ...props, title: '' })
    expect(isValid).toBeFalsy()
    expect(sut.errors.title).toStrictEqual(['title should not be empty'])

    isValid = sut.validate({ ...props, title: null })
    expect(isValid).toBeFalsy()
    expect(sut.errors.title).toStrictEqual([
      'title should not be empty',
      'title must be a string',
      'title must be shorter than or equal to 255 characters',
    ])

    isValid = sut.validate({ ...props, title: 10 as any })
    expect(isValid).toBeFalsy()
    expect(sut.errors.title).toStrictEqual([
      'title must be a string',
      'title must be shorter than or equal to 255 characters',
    ])

    isValid = sut.validate({ ...props, title: 'a'.repeat(256) })
    expect(isValid).toBeFalsy()
    expect(sut.errors.title).toStrictEqual([
      'title must be shorter than or equal to 255 characters',
    ])
  })

  it('Invalidation cases for category field', () => {
    let isValid = sut.validate({ ...props, category: '' })
    expect(isValid).toBeFalsy()
    expect(sut.errors.category).toStrictEqual(['category should not be empty'])

    isValid = sut.validate({ ...props, category: null })
    expect(isValid).toBeFalsy()
    expect(sut.errors.category).toStrictEqual([
      'category should not be empty',
      'category must be a string',
      'category must be shorter than or equal to 255 characters',
    ])

    isValid = sut.validate({ ...props, category: 10 as any })
    expect(isValid).toBeFalsy()
    expect(sut.errors.category).toStrictEqual([
      'category must be a string',
      'category must be shorter than or equal to 255 characters',
    ])

    isValid = sut.validate({ ...props, category: 'a'.repeat(256) })
    expect(isValid).toBeFalsy()
    expect(sut.errors.category).toStrictEqual([
      'category must be shorter than or equal to 255 characters',
    ])
  })

  it('Invalidation cases for type field', () => {
    let isValid = sut.validate({ ...props, type: 10 as any })
    expect(isValid).toBeFalsy()
    expect(sut.errors.type).toStrictEqual([
      'type must be a string',
      'type must be shorter than or equal to 255 characters',
    ])

    isValid = sut.validate({ ...props, type: 'a'.repeat(256) })
    expect(isValid).toBeFalsy()
    expect(sut.errors.type).toStrictEqual([
      'type must be shorter than or equal to 255 characters',
    ])
  })

  it('Invalidation cases for amount field', () => {
    let isValid = sut.validate({ ...props, amount: '' as any })
    expect(isValid).toBeFalsy()
    expect(sut.errors.amount).toStrictEqual([
      'amount should not be empty',
      'amount must be a number conforming to the specified constraints',
    ])

    isValid = sut.validate({ ...props, amount: null })
    expect(isValid).toBeFalsy()
    expect(sut.errors.amount).toStrictEqual([
      'amount should not be empty',
      'amount must be a number conforming to the specified constraints',
    ])
  })
  it('Invalidation cases for date field', () => {
    let isValid = sut.validate({ ...props, date: '' as any })
    expect(isValid).toBeFalsy()
    expect(sut.errors.date).toStrictEqual([
      'date should not be empty',
      'date must be a Date instance',
    ])

    isValid = sut.validate({ ...props, date: 'data' as any })
    expect(isValid).toBeFalsy()
    expect(sut.errors.date).toStrictEqual(['date must be a Date instance'])

    isValid = sut.validate({ ...props, date: null })
    expect(isValid).toBeFalsy()
    expect(sut.errors.date).toStrictEqual([
      'date should not be empty',
      'date must be a Date instance',
    ])

    isValid = sut.validate({ ...props, date: 10 as any })
    expect(isValid).toBeFalsy()
    expect(sut.errors.date).toStrictEqual(['date must be a Date instance'])
  })

  it('Validation cases for invoice-item', () => {
    let isValid = sut.validate(props)
    expect(isValid).toBeTruthy()
    expect(sut.validatedData).toStrictEqual(new InvoiceItemRules(props))

    isValid = sut.validate({ ...props, type: undefined })
    expect(isValid).toBeTruthy()
    expect(sut.validatedData).toStrictEqual(
      new InvoiceItemRules({
        ...props,
        type: undefined,
      }),
    )
  })
})
