import { LayoutProps } from '../../entities/layout.entity'

export function LayoutDataBuilder(): LayoutProps {
  return {
    name: 'Inter',
    titleField: 'Lançamento',
    categoryField: 'Categoria',
    typeField: 'Tipo',
    amountField: 'Valor',
    dateField: 'Data',
  }
}
