import { LayoutDataBuilder } from '@/layout/domain/testing/helpers/layout-data-builder'
import { LayoutInMemoryRepository } from '../../layout-in-memory.repository'
import { LayoutEntity } from '@/layout/domain/entities/layout.entity'
import { ConflictError } from '@/shared/domain/errors/conflict-error'

describe('LayoutInMemoryRepository unit tests', () => {
  let sut: LayoutInMemoryRepository
  beforeEach(() => {
    sut = new LayoutInMemoryRepository()
  })
  it('Should throw an error when the layout name already exist - layoutExists method', async () => {
    const entity = new LayoutEntity(LayoutDataBuilder())
    await sut.insert(entity)

    expect(sut.layoutExists(entity.name)).rejects.toThrow(
      new ConflictError('Layout name already created'),
    )
  })

  it('Should not throw an error when the layout name not exist - layoutExists method', async () => {
    expect.assertions(0)
    await sut.layoutExists('Inter')
  })

  it('Should no filter items when filter object is null', async () => {
    const entity = new LayoutEntity(LayoutDataBuilder())
    await sut.insert(entity)
    const result = await sut.findAll()
    const spyFilter = jest.spyOn(result, 'filter')
    const itemsFiltered = await sut['applyFilter'](result, null)
    expect(spyFilter).not.toHaveBeenCalled()
    expect(itemsFiltered).toStrictEqual(result)
  })

  it('Should filter name field using filter param', async () => {
    const items = [
      new LayoutEntity(LayoutDataBuilder({ name: 'Test' })),
      new LayoutEntity(LayoutDataBuilder({ name: 'TEST' })),
      new LayoutEntity(LayoutDataBuilder({ name: 'fake' })),
    ]
    const spyFilter = jest.spyOn(items, 'filter')
    const itemsFiltered = await sut['applyFilter'](items, 'TEST')
    expect(spyFilter).toHaveBeenCalled()
    expect(itemsFiltered).toStrictEqual([items[0], items[1]])
  })

  it('Should sort by name when sort param is null', async () => {
    const items = [
      new LayoutEntity(LayoutDataBuilder({ name: 'BTest' })),
      new LayoutEntity(
        LayoutDataBuilder({
          name: 'ATEST',
        }),
      ),
      new LayoutEntity(
        LayoutDataBuilder({
          name: 'CTest',
        }),
      ),
    ]
    const itemsSorted = await sut['applySort'](items, null, null)
    expect(itemsSorted).toStrictEqual([items[1], items[0], items[2]])
  })

  it('Should sort by name and desc direction', async () => {
    const items = [
      new LayoutEntity(LayoutDataBuilder({ name: 'BTest' })),
      new LayoutEntity(
        LayoutDataBuilder({
          name: 'ATEST',
        }),
      ),
      new LayoutEntity(
        LayoutDataBuilder({
          name: 'CTest',
        }),
      ),
    ]
    const itemsSorted = await sut['applySort'](items, 'name', 'desc')
    expect(itemsSorted).toStrictEqual([items[2], items[0], items[1]])
  })
})
