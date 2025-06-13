import { InvoiceRepository } from '@/invoice/domain/repositories/invoice.repository'
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case'
import { InvoiceOutput, InvoiceOutputMapper } from '../../dtos/invoice-output'

export namespace UpdateInvoiceUseCase {
  export type Input = {
    id: string
    month?: number
    year?: number
  }

  export type Output = InvoiceOutput

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private invoiceRepository: InvoiceRepository.Repository) {}
    async execute(input: Input): Promise<InvoiceOutput> {
      const entity = await this.invoiceRepository.findById(input.id)

      await this.invoiceRepository.alreadyImported(
        input.month,
        input.year,
        entity.layoutId,
      )

      entity.month = input.month ?? entity.month
      entity.year = input.year ?? entity.year

      await this.invoiceRepository.update(entity)
      return InvoiceOutputMapper.toOutput(entity)
    }
  }
}
