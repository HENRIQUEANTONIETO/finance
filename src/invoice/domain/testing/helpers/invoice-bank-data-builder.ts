import { InvoiceBankProps } from '../../entities/invoice-bank.entity'

export function InvoiceBankDataBuilder(): InvoiceBankProps {
  return {
    name: 'Inter',
    titleField: 'Lançamento',
    categoryField: 'Categoria',
    typeField: 'Tipo',
    amountField: 'Valor',
    dateField: 'Data',
  }
}
