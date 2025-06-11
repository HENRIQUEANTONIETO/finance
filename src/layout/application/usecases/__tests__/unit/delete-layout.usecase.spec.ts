import { LayoutRepository } from '@/layout/domain/repositories/layout.repository'
import { DeleteLayoutUseCase } from '../../delete.layout.usecase'
import { LayoutInMemoryRepository } from '@/layout/infrastructure/database/in-memory/repositories/layout-in-memory.repository'
import { LayoutEntity } from '@/layout/domain/entities/layout.entity'
import { LayoutDataBuilder } from '@/layout/domain/testing/helpers/layout-data-builder'
import { NotFoundError } from '@/shared/domain/errors/not-found-error'

describe('DeleteLayoutUseCase unit tests', () => {
  let sut: DeleteLayoutUseCase.UseCase
  let repository: LayoutInMemoryRepository
  beforeEach(() => {
    repository = new LayoutInMemoryRepository()
    sut = new DeleteLayoutUseCase.UseCase(repository)
  })
  it('Should delete a layout', async () => {
    const spyDelete = jest.spyOn(repository, 'delete')
    const props = LayoutDataBuilder()
    const items = [new LayoutEntity(props)]

    repository.items = items
    expect(repository.items).toHaveLength(1)
    await sut.execute({ id: items[0]._id })
    expect(spyDelete).toHaveBeenCalledTimes(1)
    expect(repository.items).toHaveLength(0)
  })

  it('Should throw an error when entity not found', async () => {
    await expect(sut.execute({ id: 'fakeID' })).rejects.toThrow(
      new NotFoundError('Entity Layout not found'),
    )
  })
})
