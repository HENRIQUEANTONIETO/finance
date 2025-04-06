import { InvoiceItemProps } from '../../entities/invoice-item.entity'

export function InvoiceItemDataBuilder(): InvoiceItemProps {
  return {
    title: 'ASA VEEK TECNOLOGIA S',
    category: 'SERVICOS',
    type: 'Compra à vista',
    amount: 20.0,
    date: new Date(),
  }
}
