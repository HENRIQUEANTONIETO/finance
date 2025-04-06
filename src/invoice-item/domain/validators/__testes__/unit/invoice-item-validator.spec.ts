import { InvoiceItemDataBuilder } from '@/invoice-item/domain/testing/helpers/invoice-item-data-builder'
import {
  InvoiceItemValidator,
  InvoiceItemValidatorFactory,
} from '../../invoice-item.validator'

const props = InvoiceItemDataBuilder()
let sut: InvoiceItemValidator
describe('InvoiceItem validator unit test', () => {
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
})
