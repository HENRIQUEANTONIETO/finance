import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case'
import { InvoiceItemEntity } from '@/invoice/domain/entities/invoice-item.entity'
import { InvoiceItemRepository } from '@/invoice/domain/repositories/invoice-item.repository'
import {
  InvoiceItemOutput,
  InvoiceItemOutputMapper,
} from '../../dtos/invoice-item-output'

export namespace CreateInvoiceItemUseCase {
  export type Input = {
    title: string
    category: string
    type?: string
    amount: number
    date: Date
  }

  export type Output = InvoiceItemOutput

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private layoutRepository: InvoiceItemRepository.Repository) {}
    async execute(input: Input): Promise<InvoiceItemOutput> {
      const entity = new InvoiceItemEntity(input)

      await this.layoutRepository.insert(entity)
      return InvoiceItemOutputMapper.toOutput(entity)
    }
  }
}
