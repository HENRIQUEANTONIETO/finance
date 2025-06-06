import { InvoiceItemProps } from '../../entities/invoice-item.entity'

export function InvoiceItemDataBuilder(
  props?: Partial<InvoiceItemProps>,
): InvoiceItemProps {
  return {
    title: props?.title ?? 'ASA VEEK TECNOLOGIA S',
    category: props?.category ?? 'SERVICOS',
    type: props?.type ?? 'Compra à vista',
    amount: props?.amount ?? 20.0,
    date: props?.date ?? new Date(),
  }
}
