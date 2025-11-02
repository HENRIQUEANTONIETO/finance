import { InvoiceOutput } from '@/invoice/application/dtos/invoice-output'
import { CreateInvoiceDto } from '../../dtos/create-invoice.dto'
import { InvoiceController } from '../../invoice.controller'
import { UpdateInvoiceDto } from '../../dtos/update-invoice.dto'
import { CreateInvoiceUseCase } from '@/invoice/application/usecases/invoice/create-invoice.usecase'
import { UpdateInvoiceUseCase } from '@/invoice/application/usecases/invoice/update-invoice.usecase'
import { ListInvoiceUseCase } from '@/invoice/application/usecases/invoice/list-invoice.usecase'
import { ListInvoiceDto } from '../../dtos/list-invoice.dto'

describe('InvoiceController unit tests', () => {
  let sut: InvoiceController
  let props: InvoiceOutput

  beforeEach(() => {
    sut = new InvoiceController()
    props = {
      id: 'decdda76-84eb-40a2-ad33-90cbce09ab89',
      items: [],
      layoutId: 'decdda76-84eb-40a2-ad33-90cbce09ab89',
      month: 11,
      year: 2025,
    }
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('Should create a invoice', async () => {
    const input: CreateInvoiceDto = props
    const output: CreateInvoiceUseCase.Output = props

    const mockCreateInvoiceUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    }

    sut['createInvoiceUseCase'] = mockCreateInvoiceUseCase as any

    const result = await sut.create(input)

    expect(result).toStrictEqual(output)
    expect(mockCreateInvoiceUseCase.execute).toHaveBeenCalledWith(input)
  })

  it('Should update a invoice', async () => {
    const output: UpdateInvoiceUseCase.Output = props

    const mockUpdateInvoiceUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    }

    sut['updateInvoiceUseCase'] = mockUpdateInvoiceUseCase as any

    const input: UpdateInvoiceDto = {
      month: 10,
    }

    const result = await sut.update(props.id, input)

    expect(output).toMatchObject(result)
    expect(mockUpdateInvoiceUseCase.execute).toHaveBeenCalledWith({
      id: props.id,
      ...input,
    })
  })

  it('Should list invoice', async () => {
    const output: ListInvoiceUseCase.Output = {
      items: [props],
      total: 1,
      currentPage: 1,
      lastPage: 1,
      perPage: 1,
    }

    const mockListInvoiceUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    }

    sut['listInvoiceUseCase'] = mockListInvoiceUseCase as any

    const input: ListInvoiceDto = {
      page: 1,
      perPage: 1,
      year: 2025,
    }

    const result = await sut.search(input)
    expect(output).toStrictEqual(result)
    expect(mockListInvoiceUseCase.execute).toHaveBeenCalledWith(input)
  })

  it('Should delete a invoice', async () => {
    const output = undefined

    const mockDeleteInvoiceUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    }

    sut['deleteInvoiceUseCase'] = mockDeleteInvoiceUseCase as any

    const result = await sut.delete(props.id)

    expect(result).toStrictEqual(output)
    expect(mockDeleteInvoiceUseCase.execute).toHaveBeenCalledWith({
      id: props.id,
    })
  })
})
