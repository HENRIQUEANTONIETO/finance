import { LayoutInMemoryRepository } from '@/layout/infrastructure/database/in-memory/repositories/layout-in-memory.repository'
import { CreateLayoutUseCase } from '../../create-layout.usecase'
import { LayoutDataBuilder } from '@/layout/domain/testing/helpers/layout-data-builder'
import { ConflictError } from '@/shared/domain/errors/conflict-error'
import { BadRequestError } from '@/shared/application/errors/bad-request-error'

describe('CreateLayoutUseCase unit tests', () => {
  let sut: CreateLayoutUseCase.UseCase
  let repository: LayoutInMemoryRepository

  beforeEach(() => {
    repository = new LayoutInMemoryRepository()
    sut = new CreateLayoutUseCase.UseCase(repository)
  })
  it('Should create a layout', async () => {
    const spyInsert = jest.spyOn(repository, 'insert')
    const props = LayoutDataBuilder()
    const result = await sut.execute(props)
    expect(result.id).toBeDefined()
    expect(spyInsert).toHaveBeenCalledTimes(1)
  })

  it('Should not be able to register with same name twice', async () => {
    const props = LayoutDataBuilder({ name: 'Inter' })
    await sut.execute(props)

    await expect(() => sut.execute(props)).rejects.toBeInstanceOf(ConflictError)
  })

  it('Should throws error when name not provided', async () => {
    const props = Object.assign(LayoutDataBuilder(), { name: null })
    await expect(() => sut.execute(props)).rejects.toBeInstanceOf(BadRequestError)
  })
})
