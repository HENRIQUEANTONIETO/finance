import { LayoutRepository } from '@/layout/domain/repositories/layout.repository'
import { LayoutOutput, LayoutOutputMapper } from '../dtos/layout-output'
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case'
import { BadRequestError } from '@/shared/application/errors/bad-request-error'

export namespace UpdateLayoutUseCase {
  export type Input = Partial<{
    id: string
    name: string
    titleField: string
    categoryField: string
    typeField: string
    amountField: string
    dateField: string
  }>

  export type Output = LayoutOutput

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private layoutRepository: LayoutRepository.Repository) {}
    async execute(input: Input): Promise<LayoutOutput> {
      if (input.name) {
        await this.layoutRepository.layoutExists(input.name, input.id)
      }

      const entity = await this.layoutRepository.findById(input.id)
      entity.update(input)

      await this.layoutRepository.update(entity)
      return LayoutOutputMapper.toOutput(entity)
    }
  }
}
