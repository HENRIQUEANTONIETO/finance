import { LayoutDataBuilder } from '@/layout/domain/testing/helpers/layout-data-builder'
import { LayoutEntity, LayoutProps } from '../../layout.entity'
import { EntityValidationError } from '@/shared/domain/errors/validation-error'

describe('LayoutEntity integration tests', () => {
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
        let props: LayoutProps = {
          ...LayoutDataBuilder(),
          [field]: value,
        }

        expect(() => new LayoutEntity(props)).toThrow(EntityValidationError)
      }
    })

    it('Invalidation cases for typeField field', () => {
      let props = { ...LayoutDataBuilder(), typeField: 10 as any }
      expect(() => new LayoutEntity(props)).toThrow(EntityValidationError)

      props = { ...props, typeField: 'a'.repeat(256) }
      expect(() => new LayoutEntity(props)).toThrow(EntityValidationError)
    })

    it('Should create a valid Invoice Layout', () => {
      expect.assertions(0)
      let props: LayoutProps = LayoutDataBuilder()
      new LayoutEntity(props)
    })
  })
})
