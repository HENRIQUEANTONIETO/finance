import { Module } from '@nestjs/common'
import { LayoutController } from './layout.controller'
import { LayoutInMemoryRepository } from './database/in-memory/repositories/layout-in-memory.repository'
import { CreateLayoutUseCase } from '../application/usecases/create-layout.usecase'
import { LayoutRepository } from '../domain/repositories/layout.repository'
import { ListLayoutUseCase } from '../application/usecases/list-layout.usecase'
import { DeleteLayoutUseCase } from '../application/usecases/delete.layout.usecase'
import { UpdateLayoutUseCase } from '../application/usecases/update-layout.usecase'

@Module({
  controllers: [LayoutController],
  providers: [
    {
      provide: 'LayoutRepository',
      useClass: LayoutInMemoryRepository,
    },
    {
      provide: CreateLayoutUseCase.UseCase,
      useFactory: (layoutRepository: LayoutRepository.Repository) => {
        return new CreateLayoutUseCase.UseCase(layoutRepository)
      },
      inject: ['LayoutRepository'],
    },
    {
      provide: ListLayoutUseCase.UseCase,
      useFactory: (layoutRepository: LayoutRepository.Repository) => {
        return new ListLayoutUseCase.UseCase(layoutRepository)
      },
      inject: ['LayoutRepository'],
    },
    {
      provide: UpdateLayoutUseCase.UseCase,
      useFactory: (layoutRepository: LayoutRepository.Repository) => {
        return new UpdateLayoutUseCase.UseCase(layoutRepository)
      },
      inject: ['LayoutRepository'],
    },
    {
      provide: DeleteLayoutUseCase.UseCase,
      useFactory: (layoutRepository: LayoutRepository.Repository) => {
        return new DeleteLayoutUseCase.UseCase(layoutRepository)
      },
      inject: ['LayoutRepository'],
    },
  ],
})
export class LayoutModule {}
