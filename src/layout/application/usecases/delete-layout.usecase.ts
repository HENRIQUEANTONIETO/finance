import { LayoutRepository } from '@/layout/domain/repositories/layout.repository'
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case'

export namespace DeleteLayoutUseCase {
  export type Input = {
    id: string
  }

  export type Output = void

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private layoutRepository: LayoutRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      await this.layoutRepository.delete(input.id)
    }
  }
}
