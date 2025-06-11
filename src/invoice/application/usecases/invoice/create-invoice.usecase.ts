import { InvoiceEntity } from '@/invoice/domain/entities/invoice.entity'
import { InvoiceRepository } from '@/invoice/domain/repositories/invoice.repository'
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case'
import { InvoiceOutput, InvoiceOutputMapper } from '../../dtos/invoice-output'
import { LayoutRepository } from '@/layout/domain/repositories/layout.repository'
import { InvoiceItemEntity } from '@/invoice/domain/entities/invoice-item.entity'

export namespace CreateInvoiceUseCase {
  export type Input = {
    layoutId: string
    items: any[]
    month: number
    year: number
    importedAt?: Date
  }

  export type Output = InvoiceOutput

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private invoiceRepository: InvoiceRepository.Repository,
      private layoutRepository: LayoutRepository.Repository,
    ) {}
    async execute(input: Input): Promise<InvoiceOutput> {
      await this.toInvoiceItemEntity(input.items, input.layoutId)

      const entity = new InvoiceEntity(input)
      await this.invoiceRepository.insert(entity)
      return InvoiceOutputMapper.toOutput(entity)
    }

    private async toInvoiceItemEntity(items: any[], layoutId: string) {
      const layout = await this.layoutRepository.findById(layoutId)
      items.map(item => {
        return new InvoiceItemEntity({
          title: item[layout.titleField],
          amount: item[layout.amountField],
          category: item[layout.categoryField],
          date: item[layout.dateField],
          type: item[layout.typeField],
        })
      })
    }
  }
}
