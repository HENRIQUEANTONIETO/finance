import { InvoiceItemEntity } from '@/invoice/domain/entities/invoice-item.entity'
import { InvoiceEntity } from '@/invoice/domain/entities/invoice.entity'

export type InvoiceOutput = {
  id: string
  layoutId: string
  items: InvoiceItemEntity[]
  month: number
  year: number
  importedAt?: Date
}

export class InvoiceOutputMapper {
  static toOutput(entity: InvoiceEntity): InvoiceOutput {
    return entity.toJSON()
  }
}
