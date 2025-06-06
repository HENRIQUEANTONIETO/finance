import { InvoiceItemEntity } from '@/invoice/domain/entities/invoice-item.entity'
import { InvoiceItemDataBuilder } from '@/invoice/domain/testing/helpers/invoice-item-data-builder'
import { InvoiceItemOutputMapper } from '../../invoice-item-output'

describe('InvoiceItemOutput unit tests', () => {
  it('should convert an InvoiceItem in output', () => {
    const entity = new InvoiceItemEntity(InvoiceItemDataBuilder())
    const spyToJson = jest.spyOn(entity, 'toJSON')
    const sut = InvoiceItemOutputMapper.toOutput(entity)

    expect(spyToJson).toHaveBeenCalled()
    expect(sut).toStrictEqual(entity.toJSON())
  })
})
