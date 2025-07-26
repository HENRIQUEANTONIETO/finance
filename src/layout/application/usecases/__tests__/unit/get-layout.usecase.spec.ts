import { GetLayoutUseCase } from '../../get-layout.usecase'
import { LayoutInMemoryRepository } from '@/layout/infrastructure/database/in-memory/repositories/layout-in-memory.repository'
import { LayoutEntity } from '@/layout/domain/entities/layout.entity'
import { LayoutDataBuilder } from '@/layout/domain/testing/helpers/layout-data-builder'
import { NotFoundError } from '@/shared/domain/errors/not-found-error'

describe('GetLayoutUseCase unit tests', () => {
  let sut: GetLayoutUseCase.UseCase
  let repository: LayoutInMemoryRepository
  beforeEach(() => {
    repository = new LayoutInMemoryRepository()
    sut = new GetLayoutUseCase.UseCase(repository)
  })
  it('Should get a layout', async () => {
    const spyGet = jest.spyOn(repository, 'findById')
    const props = LayoutDataBuilder()
    const items = [new LayoutEntity(props)]

    repository.items = items
    expect(repository.items).toHaveLength(1)
    const result = await sut.execute({ id: items[0]._id })
    expect(spyGet).toHaveBeenCalledTimes(1)
    expect(result).toStrictEqual({ ...items[0].props, id: items[0].id })
  })

  it('Should throw an error when entity not found', async () => {
    await expect(sut.execute({ id: 'fakeID' })).rejects.toThrow(
      new NotFoundError('Entity Layout not found'),
    )
  })
})
