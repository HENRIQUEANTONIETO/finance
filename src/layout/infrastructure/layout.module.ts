import { Module } from '@nestjs/common'
import { LayoutController } from './layout.controller'
import { CreateLayoutUseCase } from '../application/usecases/create-layout.usecase'
import { LayoutRepository } from '../domain/repositories/layout.repository'
import { ListLayoutUseCase } from '../application/usecases/list-layout.usecase'
import { DeleteLayoutUseCase } from '../application/usecases/delete-layout.usecase'
import { UpdateLayoutUseCase } from '../application/usecases/update-layout.usecase'
import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service'
import { LayoutPrismaRepository } from './database/prisma/repositories/layout-prisma.repository'
import { GetLayoutUseCase } from '../application/usecases/get-layout.usecase'

@Module({
  controllers: [LayoutController],
  providers: [
    {
      provide: 'PrismaService',
      useClass: PrismaService,
    },
    {
      provide: 'LayoutRepository',
      // useClass: LayoutInMemoryRepository,
      useFactory: (prismaService: PrismaService) => {
        return new LayoutPrismaRepository(prismaService)
      },
      inject: ['PrismaService'],
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
      provide: GetLayoutUseCase.UseCase,
      useFactory: (layoutRepository: LayoutRepository.Repository) => {
        return new GetLayoutUseCase.UseCase(layoutRepository)
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
