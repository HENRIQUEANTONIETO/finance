import { LayoutDataBuilder } from '@/layout/domain/testing/helpers/layout-data-builder'
import { LayoutEntity, LayoutProps } from '../../layout.entity'

describe('LayoutEntity unit tests', () => {
  let LayoutProps: LayoutProps
  let sut: LayoutEntity

  beforeEach(() => {
    LayoutProps = LayoutDataBuilder()
    LayoutEntity.validate = jest.fn()
    sut = new LayoutEntity(LayoutProps)
  })

  it('should instance LayoutEntity', () => {
    expect(LayoutEntity.validate).toHaveBeenCalled()
    expect(sut.name).toBe(LayoutProps.name)
    expect(sut.titleField).toBe(LayoutProps.titleField)
    expect(sut.amountField).toBe(LayoutProps.amountField)
    expect(sut.categoryField).toBe(LayoutProps.categoryField)
    expect(sut.dateField).toBe(LayoutProps.dateField)
    expect(sut.typeField).toBe(LayoutProps.typeField)
  })

  it('should return getter of name field', () => {
    expect(sut.name).toBeDefined()
    expect(sut.name).toEqual(LayoutProps.name)
    expect(typeof sut.name).toBe('string')
  })
  it('should return getter of titleField field', () => {
    expect(sut.titleField).toBeDefined()
    expect(sut.titleField).toEqual(LayoutProps.titleField)
    expect(typeof sut.titleField).toBe('string')
  })

  it('should return getter of categoryField field', () => {
    expect(sut.categoryField).toBeDefined()
    expect(sut.categoryField).toEqual(LayoutProps.categoryField)
    expect(typeof sut.categoryField).toBe('string')
  })

  it('should return getter of typeField field', () => {
    expect(sut.typeField).toBeDefined()
    expect(sut.typeField).toEqual(LayoutProps.typeField)
    expect(typeof sut.typeField).toBe('string')
  })

  it('should return getter of amountField field', () => {
    expect(sut.amountField).toBeDefined()
    expect(sut.amountField).toEqual(LayoutProps.amountField)
    expect(typeof sut.amountField).toBe('string')
  })

  it('should return getter of dateField field', () => {
    expect(sut.dateField).toBeDefined()
    expect(sut.dateField).toEqual(LayoutProps.dateField)
    expect(typeof sut.dateField).toBe('string')
  })

  it('should call validate when updating', () => {
    const spy = jest.spyOn(LayoutEntity, 'validate')
    const updateProps = { name: 'Updated Name' }
    sut.update(updateProps)
    expect(spy).toHaveBeenCalledWith(expect.objectContaining(updateProps))
    expect(sut.name).toBe('Updated Name')
  })

  it('should update multiple fields and keep others unchanged', () => {
    const originalTitle = sut.titleField
    const updateProps = { name: 'New Name', amountField: 'newAmount' }
    sut.update(updateProps)
    expect(sut.name).toBe('New Name')
    expect(sut.amountField).toBe('newAmount')
    expect(sut.titleField).toBe(originalTitle)
  })

  it('should throw if validate fails on update', () => {
    jest.spyOn(LayoutEntity, 'validate').mockImplementationOnce(() => {
      throw new Error('Invalid')
    })
    expect(() => {
      sut.update({ name: '' })
    }).toThrow('Invalid')
  })
})
