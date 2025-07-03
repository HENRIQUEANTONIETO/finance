import { LayoutOutput } from '@/layout/application/dtos/layout-output'
import { CreateLayoutDto } from '../../dtos/create-layout.dto'
import { LayoutController } from '../../layout.controller'
import { UpdateLayoutDto } from '../../dtos/update-layout.dto'

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
    const output: LayoutOutput = props

    const mockCreateLayoutUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    }

    sut['createLayoutUseCase'] = mockCreateLayoutUseCase as any

    const result = await sut.create(input)

    expect(result).toStrictEqual(output)
    expect(mockCreateLayoutUseCase.execute).toHaveBeenCalledWith(input)
  })

  it('Should update a layout', async () => {
    const output: LayoutOutput = props

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
})
