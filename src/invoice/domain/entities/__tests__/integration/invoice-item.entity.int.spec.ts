import { InvoiceItemDataBuilder } from '@/invoice/domain/testing/helpers/invoice-item-data-builder'
import { InvoiceItemEntity, InvoiceItemProps } from '../../invoice-item.entity'
import { EntityValidationError } from '@/shared/domain/errors/validation-error'

describe('InvoiceItemEntity integration tests', () => {
  describe('Constructor method', () => {
    it('Should return an error when the title is invalid', () => {
      const invalidTitleValues = [null, '', 10, 'a'.repeat(256)]

      for (const value of invalidTitleValues) {
        let props: InvoiceItemProps = {
          ...InvoiceItemDataBuilder(),
          title: value as any,
        }

        expect(() => new InvoiceItemEntity(props)).toThrow(
          EntityValidationError,
        )
      }
    })

    it('Should return an error when the category is invalid', () => {
      const invalidCategoryValues = [null, '', 10, 'a'.repeat(256)]

      for (const value of invalidCategoryValues) {
        let props: InvoiceItemProps = {
          ...InvoiceItemDataBuilder(),
          category: value as any,
        }

        expect(() => new InvoiceItemEntity(props)).toThrow(
          EntityValidationError,
        )
      }
    })

    it('Should return an error when the type is invalid', () => {
      const invalidTypeValues = [10, 'a'.repeat(256)]

      for (const value of invalidTypeValues) {
        let props: InvoiceItemProps = {
          ...InvoiceItemDataBuilder(),
          type: value as any,
        }

        expect(() => new InvoiceItemEntity(props)).toThrow(
          EntityValidationError,
        )
      }
    })

    it('Should return an error when the amount is invalid', () => {
      const invalidAmountValues = [null, '', '10']

      for (const value of invalidAmountValues) {
        let props: InvoiceItemProps = {
          ...InvoiceItemDataBuilder(),
          amount: value as any,
        }

        expect(() => new InvoiceItemEntity(props)).toThrow(
          EntityValidationError,
        )
      }
    })

    it('Should return an error when the amount is invalid', () => {
      const invalidAmountValues = [null, '', '10']

      for (const value of invalidAmountValues) {
        let props: InvoiceItemProps = {
          ...InvoiceItemDataBuilder(),
          amount: value as any,
        }

        expect(() => new InvoiceItemEntity(props)).toThrow(
          EntityValidationError,
        )
      }
    })

    it('Should return an error when the date is invalid', () => {
      const invalidDateValues = [null, '', 'date', 50]

      for (const value of invalidDateValues) {
        let props: InvoiceItemProps = {
          ...InvoiceItemDataBuilder(),
          date: value as any,
        }

        expect(() => new InvoiceItemEntity(props)).toThrow(
          EntityValidationError,
        )
      }
    })

    it('Should create a valid Invoice Item', () => {
      expect.assertions(0)
      let props: InvoiceItemProps = InvoiceItemDataBuilder()
      new InvoiceItemEntity(props)
    })
  })
})
