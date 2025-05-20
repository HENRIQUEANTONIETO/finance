import { LayoutProps } from '../../entities/layout.entity'

type Props = {
  name?: string
  titleField?: string
  categoryField?: string
  typeField?: string
  amountField?: string
  dateField?: string
}

export function LayoutDataBuilder(props?: Props): LayoutProps {
  return {
    name: props?.name ?? 'Inter',
    titleField: props?.titleField ?? 'Lançamento',
    categoryField: props?.categoryField ?? 'Categoria',
    typeField: props?.typeField ?? 'Tipo',
    amountField: props?.amountField ?? 'Valor',
    dateField: props?.dateField ?? 'Data',
  }
}
