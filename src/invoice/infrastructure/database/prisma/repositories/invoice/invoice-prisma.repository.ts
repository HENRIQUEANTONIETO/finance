import { InvoiceEntity } from '@/invoice/domain/entities/invoice.entity'
import { InvoiceRepository } from '@/invoice/domain/repositories/invoice.repository'
import { BadRequestError } from '@/shared/application/errors/bad-request-error'
import { ConflictError } from '@/shared/domain/errors/conflict-error'
import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service'

export class InvoicePrismaRepository implements InvoiceRepository.Repository {
  constructor(private prismaService: PrismaService) {}

  sortableFields: string[]

  async alreadyImported(month: number, year: number, layoutId: string): Promise<void> {
    //TODO: Aqui eu pensei que poderia ter uma constrainst no banco
    const entity = await this.prismaService.invoice.findFirst({
      where: { month, year, layoutId },
    })
    if (entity) {
      throw new ConflictError('Invoice has already imported')
    }
  }
  search(props: InvoiceRepository.SearchParams): Promise<InvoiceRepository.SearchResult> {
    throw new Error('Method not implemented.')
  }
  async insert(entity: InvoiceEntity): Promise<void> {
    const layoutExists = await this.prismaService.layout.findUnique({
      where: { id: entity.layoutId },
    })

    if (!layoutExists) throw new BadRequestError('Layout informado não existe')

    await this.prismaService.invoice.create({
      data: {
        ...entity.toJSON(),
        items: {
          create: entity.items.map(item => item.toJSON()),
        },
      },
    })
  }
  findById(id: string): Promise<InvoiceEntity> {
    throw new Error('Method not implemented.')
  }
  findAll(): Promise<InvoiceEntity[]> {
    throw new Error('Method not implemented.')
  }
  update(entity: InvoiceEntity): Promise<void> {
    throw new Error('Method not implemented.')
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
