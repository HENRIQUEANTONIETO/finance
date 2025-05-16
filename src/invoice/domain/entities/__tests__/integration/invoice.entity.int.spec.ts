import { InvoiceDataBuilder } from '@/invoice/domain/testing/helpers/invoice-data-builder'
import { InvoiceEntity, InvoiceProps } from '../../invoice.entity'
import { EntityValidationError } from '@/shared/domain/errors/validation-error'

describe('InvoiceEntity integration tests', () => {
  describe('Constructor method', () => {
    it('Should return an error when the layout is invalid', () => {
      const invalidLayoutValues = [null, '', 10]

      for (const value of invalidLayoutValues) {
        let props: InvoiceProps = {
          ...InvoiceDataBuilder(),
          layoutId: value as any,
        }

        expect(() => new InvoiceEntity(props)).toThrow(EntityValidationError)
      }
    })

    it('Should return an error when the month is invalid', () => {
      const invalidMonthValues = [null, '', 15, 0, '2']

      for (const value of invalidMonthValues) {
        let props: InvoiceProps = {
          ...InvoiceDataBuilder(),
          month: value as any,
        }

        expect(() => new InvoiceEntity(props)).toThrow(EntityValidationError)
      }
    })

    it('Should return an error when the year is invalid', () => {
      const invalidYearValues = [null, '', 15, '2', 1999]

      for (const value of invalidYearValues) {
        let props: InvoiceProps = {
          ...InvoiceDataBuilder(),
          year: value as any,
        }

        expect(() => new InvoiceEntity(props)).toThrow(EntityValidationError)
      }
    })

    it('Should return an error when the importedAt is invalid', () => {
      const invalidImportedAtValues = ['', 15, '2']

      for (const value of invalidImportedAtValues) {
        let props: InvoiceProps = {
          ...InvoiceDataBuilder(),
          importedAt: value as any,
        }

        expect(() => new InvoiceEntity(props)).toThrow(EntityValidationError)
      }
    })

    it('Should return an error when the items is invalid', () => {
      const invalidItemsValues = ['', null, [], {}, 20, 'items']

      for (const value of invalidItemsValues) {
        let props: InvoiceProps = {
          ...InvoiceDataBuilder(),
          items: value as any,
        }

        expect(() => new InvoiceEntity(props)).toThrow(EntityValidationError)
      }
    })

    it('Should create a valid Invoice', () => {
      expect.assertions(0)
      let props: InvoiceProps = InvoiceDataBuilder()
      new InvoiceEntity(props)
    })
  })
})
