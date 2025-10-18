import { InvoiceEntity } from '@/invoice/domain/entities/invoice.entity'
import { InvoiceItemEntity } from '@/invoice/domain/entities/invoice-item.entity'
import { InvoiceRepository } from '@/invoice/domain/repositories/invoice.repository'
import { BadRequestError } from '@/shared/application/errors/bad-request-error'
import { ConflictError } from '@/shared/domain/errors/conflict-error'
import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service'
import { NotFoundError } from '@/shared/domain/errors/not-found-error'

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

  async search(
    props: InvoiceRepository.SearchParams,
  ): Promise<InvoiceRepository.SearchResult> {
    const sortable = this.sortableFields?.includes(props.sort) || false
    const orderByField = sortable ? props.sort : 'month'
    const orderByDir = sortable ? props.sortDir : 'desc'
    const count = await this.prismaService.invoice.count({
      ...(props.filter && {
        where: {
          year: {
            equals: Number(props.filter),
          },
        },
      }),
    })

    const models = await this.prismaService.invoice.findMany({
      ...(props.filter && {
        where: {
          year: {
            equals: Number(props.filter),
          },
        },
      }),
      orderBy: {
        [orderByField]: orderByDir,
      },
      skip: props.page && props.page > 0 ? (props.page - 1) * props.perPage : 1,
      take: props.perPage && props.perPage > 0 ? props.perPage : 15,
      include: { items: true },
    })

    return new InvoiceRepository.SearchResult({
      items: models.map(
        model =>
          new InvoiceEntity({
            ...model,
            items: model.items.map(
              i => new InvoiceItemEntity({ ...i, amount: Number(i.amount) }),
            ),
          }),
      ),
      total: count,
      currentPage: props.page,
      perPage: props.perPage,
      sort: orderByField,
      sortDir: orderByDir,
      filter: props.filter,
    })
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

  async findById(id: string): Promise<InvoiceEntity> {
    return await this._get(id)
  }

  async findAll(): Promise<InvoiceEntity[]> {
    const invoices = await this.prismaService.invoice.findMany({
      include: { items: true },
    })

    return invoices.map(
      i =>
        new InvoiceEntity({
          ...i,
          items: i.items.map(
            item => new InvoiceItemEntity({ ...item, amount: Number(item.amount) }),
          ),
        }),
    )
  }

  async update(entity: InvoiceEntity): Promise<void> {
    await this._get(entity.id)
    await this.prismaService.invoice.update({
      data: {
        ...entity.toJSON(),
        items: {},
      },
      where: { id: entity.id },
    })
  }

  async delete(id: string): Promise<void> {
    await this._get(id)
    await this.prismaService.invoice.delete({ where: { id } })
  }

  protected async _get(id: string): Promise<InvoiceEntity> {
    try {
      const invoice = await this.prismaService.invoice.findUnique({
        where: { id },
        include: { items: true },
      })

      const invoiceItemEntity: InvoiceItemEntity[] = invoice.items.map(
        i => new InvoiceItemEntity({ ...i, amount: Number(i.amount) }),
      )

      return new InvoiceEntity({ ...invoice, items: invoiceItemEntity })
    } catch {
      throw new NotFoundError(`Invoice not found using ID ${id}`)
    }
  }
}
