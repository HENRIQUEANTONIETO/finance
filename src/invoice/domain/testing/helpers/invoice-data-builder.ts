import { InvoiceItemEntity } from '../../entities/invoice-item.entity'
import { InvoiceProps } from '../../entities/invoice.entity'
import { InvoiceItemDataBuilder } from './invoice-item-data-builder'

export function InvoiceDataBuilder(): InvoiceProps {
  const item = new InvoiceItemEntity(InvoiceItemDataBuilder())

  return {
    bank: 'Inter',
    items: [item],
    month: 4,
    year: 2025,
  }
}
