import { LayoutEntity } from '@/layout/domain/entities/layout.entity'
import { LayoutDataBuilder } from '@/layout/domain/testing/helpers/layout-data-builder'
import { LayoutOutputMapper } from '../../layout-output'

describe('LayoutOutput unit tests', () => {
  it('should convert a layout in output', () => {
    const entity = new LayoutEntity(LayoutDataBuilder())
    const spyToJson = jest.spyOn(entity, 'toJSON')
    const sut = LayoutOutputMapper.toOutput(entity)

    expect(spyToJson).toHaveBeenCalled()
    expect(sut).toStrictEqual(entity.toJSON())
  })
})
