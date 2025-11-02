import { Module } from '@nestjs/common'
import { InvoiceController } from './invoice.controller'
import { CreateInvoiceUseCase } from '../application/usecases/invoice/create-invoice.usecase'
import { InvoiceRepository } from '../domain/repositories/invoice.repository'
import { ListInvoiceUseCase } from '../application/usecases/invoice/list-invoice.usecase'
import { DeleteInvoiceUseCase } from '../application/usecases/invoice/delete-invoice.usecase'
import { UpdateInvoiceUseCase } from '../application/usecases/invoice/update-invoice.usecase'
import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service'
import { InvoicePrismaRepository } from './database/prisma/repositories/invoice/invoice-prisma.repository'
import { LayoutRepository } from '@/layout/domain/repositories/layout.repository'
// import { GetInvoiceUseCase } from '../application/usecases/invoice/get-invoice.usecase'

@Module({
  controllers: [InvoiceController],
  providers: [
    {
      provide: 'PrismaService',
      useClass: PrismaService,
    },
    {
      provide: 'InvoiceRepository',
      // useClass: InvoiceInMemoryRepository,
      useFactory: (prismaService: PrismaService) => {
        return new InvoicePrismaRepository(prismaService)
      },
      inject: ['PrismaService'],
    },
    {
      provide: CreateInvoiceUseCase.UseCase,
      useFactory: (
        invoiceRepository: InvoiceRepository.Repository,
        layoutRepository: LayoutRepository.Repository,
      ) => {
        return new CreateInvoiceUseCase.UseCase(invoiceRepository, layoutRepository)
      },
      inject: ['InvoiceRepository'],
    },
    {
      provide: ListInvoiceUseCase.UseCase,
      useFactory: (invoiceRepository: InvoiceRepository.Repository) => {
        return new ListInvoiceUseCase.UseCase(invoiceRepository)
      },
      inject: ['InvoiceRepository'],
    },
    // {
    //   provide: GetInvoiceUseCase.UseCase,
    //   useFactory: (invoiceRepository: InvoiceRepository.Repository) => {
    //     return new GetInvoiceUseCase.UseCase(invoiceRepository)
    //   },
    //   inject: ['InvoiceRepository'],
    // },
    {
      provide: UpdateInvoiceUseCase.UseCase,
      useFactory: (invoiceRepository: InvoiceRepository.Repository) => {
        return new UpdateInvoiceUseCase.UseCase(invoiceRepository)
      },
      inject: ['InvoiceRepository'],
    },
    {
      provide: DeleteInvoiceUseCase.UseCase,
      useFactory: (invoiceRepository: InvoiceRepository.Repository) => {
        return new DeleteInvoiceUseCase.UseCase(invoiceRepository)
      },
      inject: ['InvoiceRepository'],
    },
  ],
})
export class InvoiceModule {}
