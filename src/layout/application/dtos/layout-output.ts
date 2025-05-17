import { LayoutEntity } from '@/layout/domain/entities/layout.entity'

export type LayoutOutput = {
  name: string
  titleField: string
  categoryField: string
  typeField?: string
  amountField: string
  dateField: string
}

export class LayoutOutputMapper {
  static toOutput(entity: LayoutEntity): LayoutOutput {
    return entity.toJSON()
  }
}
