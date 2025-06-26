import { Module } from '@nestjs/common'
import { LayoutController } from './layout.controller'
import { LayoutInMemoryRepository } from './database/in-memory/repositories/layout-in-memory.repository'
import { CreateLayoutUseCase } from '../application/usecases/create-layout.usecase'
import { LayoutRepository } from '../domain/repositories/layout.repository'

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
    },
  ],
})
export class LayoutModule {}
