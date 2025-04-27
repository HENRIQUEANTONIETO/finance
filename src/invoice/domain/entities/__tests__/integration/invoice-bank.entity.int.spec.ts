import { InvoiceBankDataBuilder } from '@/invoice/domain/testing/helpers/invoice-bank-data-builder'
import { InvoiceBankEntity, InvoiceBankProps } from '../../invoice-bank.entity'
import { EntityValidationError } from '@/shared/domain/errors/validation-error'

describe('InvoiceBankEntity integration tests', () => {
  describe('Constructor method', () => {
    const fieldsRequired = [
      'name',
      'titleField',
      'categoryField',
      'amountField',
      'dateField',
    ]

    it.each(fieldsRequired)('Invalidation cases for %s field', field => {
      const invalidValues = [null, '', 10, 'a'.repeat(256)]

      for (const value of invalidValues) {
        let props: InvoiceBankProps = {
          ...InvoiceBankDataBuilder(),
          [field]: value,
        }

        expect(() => new InvoiceBankEntity(props)).toThrow(EntityValidationError)
      }
    })

    it('Invalidation cases for typeField field', () => {
      let props = { ...InvoiceBankDataBuilder(), typeField: 10 as any }
      expect(() => new InvoiceBankEntity(props)).toThrow(EntityValidationError)

      props = { ...props, typeField: 'a'.repeat(256) }
      expect(() => new InvoiceBankEntity(props)).toThrow(EntityValidationError)
    })

    it('Should create a valid Invoice Bank', () => {
      expect.assertions(0)
      let props: InvoiceBankProps = InvoiceBankDataBuilder()
      new InvoiceBankEntity(props)
    })
  })
})
