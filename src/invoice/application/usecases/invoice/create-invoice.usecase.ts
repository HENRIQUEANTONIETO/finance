import { InvoiceEntity } from '@/invoice/domain/entities/invoice.entity'
import { InvoiceRepository } from '@/invoice/domain/repositories/invoice.repository'
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case'
import { InvoiceOutput, InvoiceOutputMapper } from '../../dtos/invoice-output'
import { LayoutRepository } from '@/layout/domain/repositories/layout.repository'
import { InvoiceItemEntity } from '@/invoice/domain/entities/invoice-item.entity'
import { parseMoney } from '../../helpers/parse-money'
import { parseDateBR } from '../../helpers/parse-date-br'

export namespace CreateInvoiceUseCase {
  export type Input = {
    layoutId: string
    items: any[]
    month: number
    year: number
  }

  export type Output = InvoiceOutput

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private invoiceRepository: InvoiceRepository.Repository,
      private layoutRepository: LayoutRepository.Repository,
    ) {}
    async execute(input: Input): Promise<InvoiceOutput> {
      await this.invoiceRepository.alreadyImported(
        input.month,
        input.year,
        input.layoutId,
      )
      const invoiceItem = await this.toInvoiceItemEntity(input.items, input.layoutId)
      const entity = new InvoiceEntity({ ...input, items: invoiceItem })
      await this.invoiceRepository.insert(entity)
      return InvoiceOutputMapper.toOutput(entity)
    }

    private async toInvoiceItemEntity(
      items: any[],
      layoutId: string,
    ): Promise<InvoiceItemEntity[]> {
      const layout = await this.layoutRepository.findById(layoutId)
      return items.map(item => {
        return new InvoiceItemEntity({
          title: item[layout.titleField],
          amount: parseMoney(item[layout.amountField]),
          category: item[layout.categoryField],
          date: parseDateBR(item[layout.dateField]),
          type: item[layout.typeField],
        })
      })
    }
  }
}
