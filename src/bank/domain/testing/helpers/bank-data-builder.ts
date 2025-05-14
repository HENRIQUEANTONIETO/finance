import { BankProps } from '../../entities/bank.entity'

export function BankDataBuilder(): BankProps {
  return {
    name: 'Inter',
    titleField: 'Lançamento',
    categoryField: 'Categoria',
    typeField: 'Tipo',
    amountField: 'Valor',
    dateField: 'Data',
  }
}
