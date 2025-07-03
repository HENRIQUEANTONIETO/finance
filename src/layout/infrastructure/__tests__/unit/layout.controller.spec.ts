import { LayoutOutput } from '@/layout/application/dtos/layout-output'
import { CreateLayoutDto } from '../../dtos/create-layout.dto'
import { LayoutController } from '../../layout.controller'

describe('LayoutController unit tests', () => {
  let sut: LayoutController

  beforeEach(() => {
    sut = new LayoutController()
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('Should create a layout', async () => {
    const input: CreateLayoutDto = {
      name: 'Inter',
      titleField: 'Titulo',
      categoryField: 'Categoria',
      typeField: 'Tipo',
      amountField: 'Valor',
      dateField: 'Data',
    }

    const output: LayoutOutput = {
      id: 'df96ae94-6128-486e-840c-b6f78abb4801',
      name: 'Inter',
      titleField: 'Titulo',
      categoryField: 'Categoria',
      typeField: 'Tipo',
      amountField: 'Valor',
      dateField: 'Data',
    }

    const mockCreateLayoutUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    }

    sut['createLayoutUseCase'] = mockCreateLayoutUseCase as any

    const result = await sut.create(input)

    expect(result).toStrictEqual(output)
    expect(mockCreateLayoutUseCase.execute).toHaveBeenCalledWith(input)
  })
})
