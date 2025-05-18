import { LayoutRepository } from '@/layout/domain/repositories/layout.repository'
import { LayoutOutput, LayoutOutputMapper } from '../dtos/layout-output'
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case'
import { BadRequestError } from '@/shared/application/errors/bad-request-error'
import { LayoutEntity } from '@/layout/domain/entities/layout.entity'

export namespace CreateLayoutUseCase {
  export type Input = {
    name: string
    titleField: string
    categoryField: string
    typeField?: string
    amountField: string
    dateField: string
  }

  export type Output = LayoutOutput

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private layoutRepository: LayoutRepository.Repository) {}
    async execute(input: Input): Promise<LayoutOutput> {
      if (!input.name) {
        throw new BadRequestError('name not provided')
      }

      await this.layoutRepository.layoutExists(input.name)

      const entity = new LayoutEntity(input)

      await this.layoutRepository.insert(entity)
      return LayoutOutputMapper.toOutput(entity)
    }
  }
}
