import { InvoiceEntity } from '@/invoice/domain/entities/invoice.entity'
import { InvoiceRepository } from '@/invoice/domain/repositories/invoice.repository'
import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service'

export class InvoicePrismaRepository implements InvoiceRepository.Repository {
  constructor(private prismaService: PrismaService) {}

  sortableFields: string[]

  alreadyImported(month: number, year: number, layoutId: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
  search(props: InvoiceRepository.SearchParams): Promise<InvoiceRepository.SearchResult> {
    throw new Error('Method not implemented.')
  }
  insert(entity: InvoiceEntity): Promise<void> {
    throw new Error('Method not implemented.')
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
