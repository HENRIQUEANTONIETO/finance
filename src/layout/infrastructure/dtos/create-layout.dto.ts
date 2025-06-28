import { CreateLayoutUseCase } from '@/layout/application/usecases/create-layout.usecase'

export class CreateLayoutDto implements CreateLayoutUseCase.Input {
  name: string
  titleField: string
  categoryField: string
  typeField?: string
  amountField: string
  dateField: string
}
