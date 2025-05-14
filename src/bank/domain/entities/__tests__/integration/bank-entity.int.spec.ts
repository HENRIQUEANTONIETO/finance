import { BankDataBuilder } from '@/bank/domain/testing/helpers/bank-data-builder'
import { BankEntity, BankProps } from '../../bank.entity'
import { EntityValidationError } from '@/shared/domain/errors/validation-error'

describe('BankEntity integration tests', () => {
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
        let props: BankProps = {
          ...BankDataBuilder(),
          [field]: value,
        }

        expect(() => new BankEntity(props)).toThrow(EntityValidationError)
      }
    })

    it('Invalidation cases for typeField field', () => {
      let props = { ...BankDataBuilder(), typeField: 10 as any }
      expect(() => new BankEntity(props)).toThrow(EntityValidationError)

      props = { ...props, typeField: 'a'.repeat(256) }
      expect(() => new BankEntity(props)).toThrow(EntityValidationError)
    })

    it('Should create a valid Invoice Bank', () => {
      expect.assertions(0)
      let props: BankProps = BankDataBuilder()
      new BankEntity(props)
    })
  })
})
