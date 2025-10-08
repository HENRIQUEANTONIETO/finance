import { InvoiceItemEntity } from '../../entities/invoice-item.entity'
import { InvoiceProps } from '../../entities/invoice.entity'
import { InvoiceItemDataBuilder } from './invoice-item-data-builder'

export function InvoiceDataBuilder(overrides: Partial<InvoiceProps> = {}): InvoiceProps {
  const defaultItems = [
    new InvoiceItemEntity(InvoiceItemDataBuilder()),
    new InvoiceItemEntity(InvoiceItemDataBuilder()),
  ]

  return {
    layoutId: '92c4903b-59a3-4dfe-b217-08c312471f85',
    items: defaultItems,
    month: 4,
    year: 2025,
    ...overrides,
  }
}
