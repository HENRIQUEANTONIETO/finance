import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case'
import { InvoiceItemRepository } from '@/invoice/domain/repositories/invoice-item.repository'

export namespace DeleteInvoiceItemUseCase {
  export type Input = {
    id: string
  }

  export type Output = void

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private layoutRepository: InvoiceItemRepository.Repository) {}
    async execute(input: Input): Promise<Output> {
      await this.layoutRepository.delete(input.id)
    }
  }
}
