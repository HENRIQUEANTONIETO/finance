import { LayoutRepository } from '@/layout/domain/repositories/layout.repository'
import { LayoutOutput, LayoutOutputMapper } from '../dtos/layout-output'
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case'

export namespace GetLayoutUseCase {
  export type Input = { id: string }

  export type Output = LayoutOutput

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private layoutRepository: LayoutRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const result = await this.layoutRepository.findById(input.id)
      return LayoutOutputMapper.toOutput(result)
    }
  }
}
