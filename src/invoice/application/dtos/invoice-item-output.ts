import { InvoiceItemEntity } from '@/invoice/domain/entities/invoice-item.entity'

export type InvoiceItemOutput = {
  id: string
  title: string
  category: string
  type?: string
  amount: number
  date: Date
}

export class InvoiceItemOutputMapper {
  static toOutput(entity: InvoiceItemEntity): InvoiceItemOutput {
    return entity.toJSON()
  }
}
