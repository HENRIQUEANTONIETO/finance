import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case'
import { InvoiceRepository } from '@/invoice/domain/repositories/invoice.repository'
import { BadRequestError } from '@/shared/application/errors/bad-request-error'

export namespace DeleteInvoiceUseCase {
  export type Input = { id: string }

  export type Output = void

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private layoutRepository: InvoiceRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      if (!input?.id) {
        throw new BadRequestError('id not provided')
      }

      await this.layoutRepository.delete(input.id)
    }
  }
}
