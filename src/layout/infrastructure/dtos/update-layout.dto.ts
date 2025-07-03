import { UpdateLayoutUseCase } from '@/layout/application/usecases/update-layout.usecase'

export class UpdateLayoutDto implements Omit<UpdateLayoutUseCase.Input, 'id'> {
  name?: string
  titleField?: string
  categoryField?: string
  typeField?: string
  amountField?: string
  dateField?: string
}
