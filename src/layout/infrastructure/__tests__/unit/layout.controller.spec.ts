import { LayoutOutput } from '@/layout/application/dtos/layout-output'
import { CreateLayoutDto } from '../../dtos/create-layout.dto'
import { LayoutController } from '../../layout.controller'
import { UpdateLayoutDto } from '../../dtos/update-layout.dto'
import { CreateLayoutUseCase } from '@/layout/application/usecases/create-layout.usecase'
import { UpdateLayoutUseCase } from '@/layout/application/usecases/update-layout.usecase'
import { ListLayoutUseCase } from '@/layout/application/usecases/list-layout.usecase'
import { ListLayoutDto } from '../../dtos/list-layout.dto'
import { DeleteLayoutUseCase } from '@/layout/application/usecases/delete-layout.usecase'

describe('LayoutController unit tests', () => {
  let sut: LayoutController
  let props: LayoutOutput

  beforeEach(() => {
    sut = new LayoutController()
    props = {
      id: 'df96ae94-6128-486e-840c-b6f78abb4801',
      name: 'Inter',
      titleField: 'Titulo',
      categoryField: 'Categoria',
      typeField: 'Tipo',
      amountField: 'Valor',
      dateField: 'Data',
    }
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('Should create a layout', async () => {
    const input: CreateLayoutDto = props
    const output: CreateLayoutUseCase.Output = props

    const mockCreateLayoutUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    }

    sut['createLayoutUseCase'] = mockCreateLayoutUseCase as any

    const result = await sut.create(input)

    expect(result).toStrictEqual(output)
    expect(mockCreateLayoutUseCase.execute).toHaveBeenCalledWith(input)
  })

  it('Should update a layout', async () => {
    const output: UpdateLayoutUseCase.Output = props

    const mockUpdateLayoutUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    }

    sut['updateLayoutUseCase'] = mockUpdateLayoutUseCase as any

    const input: UpdateLayoutDto = {
      name: 'Teste',
    }

    const result = await sut.update(props.id, input)

    expect(output).toMatchObject(result)
    expect(mockUpdateLayoutUseCase.execute).toHaveBeenCalledWith({
      id: props.id,
      ...input,
    })
  })

  it('Should list layout', async () => {
    const output: ListLayoutUseCase.Output = {
      items: [props],
      total: 1,
      currentPage: 1,
      lastPage: 1,
      perPage: 1,
    }

    const mockListLayoutUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    }

    sut['listLayoutUseCase'] = mockListLayoutUseCase as any

    const input: ListLayoutDto = {
      page: 1,
      perPage: 1,
    }

    const result = await sut.search(input)
    expect(output).toStrictEqual(result)
    expect(mockListLayoutUseCase.execute).toHaveBeenCalledWith(input)
  })

  it('Should delete a layout', async () => {
    const output = undefined

    const mockDeleteLayoutUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    }

    sut['deleteLayoutUseCase'] = mockDeleteLayoutUseCase as any

    const result = await sut.delete(props.id)

    expect(result).toStrictEqual(output)
    expect(mockDeleteLayoutUseCase.execute).toHaveBeenCalledWith({
      id: props.id,
    })
  })
})
