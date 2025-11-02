import { UpdateInvoiceUseCase } from '@/invoice/application/usecases/invoice/update-invoice.usecase'

export class UpdateInvoiceDto implements Omit<UpdateInvoiceUseCase.Input, 'id'> {
  month?: number
  year?: number
}
