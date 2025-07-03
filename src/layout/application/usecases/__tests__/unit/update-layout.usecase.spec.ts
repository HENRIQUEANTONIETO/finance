import { LayoutInMemoryRepository } from '@/layout/infrastructure/database/in-memory/repositories/layout-in-memory.repository'
import { UpdateLayoutUseCase } from '../../update-layout.usecase'
import { LayoutDataBuilder } from '@/layout/domain/testing/helpers/layout-data-builder'
import { ConflictError } from '@/shared/domain/errors/conflict-error'
import { BadRequestError } from '@/shared/application/errors/bad-request-error'
import { LayoutEntity, LayoutProps } from '@/layout/domain/entities/layout.entity'
import { NotFoundError } from '@/shared/domain/errors/not-found-error'

describe('UpdateLayoutUseCase unit tests', () => {
  let sut: UpdateLayoutUseCase.UseCase
  let repository: LayoutInMemoryRepository
  let props: LayoutProps

  beforeEach(() => {
    repository = new LayoutInMemoryRepository()
    sut = new UpdateLayoutUseCase.UseCase(repository)
    props = LayoutDataBuilder()
  })
  it('Should update a layout', async () => {
    const spyUpdate = jest.spyOn(repository, 'update')
    const items = [new LayoutEntity(props)]
    repository.items = items

    const result = await sut.execute({
      ...props,
      id: items[0].id,
      titleField: 'Updated Title',
    })
    expect(spyUpdate).toHaveBeenCalledTimes(1)
    expect(result).toStrictEqual({ ...items[0].toJSON(), titleField: 'Updated Title' })
  })

  it('Should throws error when layout not found', async () => {
    await expect(() => sut.execute({ ...props, id: 'fakeId' })).rejects.toThrow(
      new NotFoundError('Entity Layout not found'),
    )
  })

  it('Should not be able to update with same name twice', async () => {
    const items = [new LayoutEntity({ ...props, name: 'teste1' })]
    repository.items = items
    await expect(() =>
      sut.execute({ ...props, id: 'fakeId', name: 'teste1' }),
    ).rejects.toThrow(new ConflictError('Layout name already created'))
  })
})
