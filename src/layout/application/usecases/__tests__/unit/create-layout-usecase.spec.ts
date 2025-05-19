import { LayoutInMemoryRepository } from '@/layout/infrastructure/database/in-memory/repositories/layout-in-memory.repository'
import { CreateLayoutUseCase } from '../../create-layout.usecase'

describe('CreateLayoutUseCase unit tests', () => {
  let sut: CreateLayoutUseCase.UseCase
  let repository: LayoutInMemoryRepository

  beforeEach(() => {
    repository = new LayoutInMemoryRepository()
    sut = new CreateLayoutUseCase.UseCase(repository)
  })
  it('Should create a layout', async () => {
    const spyInsert = jest.spyOn(repository, 'insert')
    const props = UserDataBuilder({})
    const result = await sut.execute({
      name: props.name,
      email: props.email,
      password: props.password,
    })
    expect(result.id).toBeDefined()
    expect(result.createdAt).toBeInstanceOf(Date)
    expect(spyInsert).toHaveBeenCalledTimes(1)
  })
})
