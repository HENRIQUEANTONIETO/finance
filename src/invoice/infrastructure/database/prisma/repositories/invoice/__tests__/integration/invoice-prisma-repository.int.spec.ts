import { PrismaClient } from '@prisma/client'
import { InvoicePrismaRepository } from '../../invoice-prisma.repository'
import { InvoiceEntity } from '@/invoice/domain/entities/invoice.entity'
import { InvoiceDataBuilder } from '@/invoice/domain/testing/helpers/invoice-data-builder'
import { setupPrismaTests } from '@/shared/infrastructure/database/prisma/testing/setup-prisma-tests'
import { BadRequestError } from '@/shared/application/errors/bad-request-error'
import { LayoutEntity } from '@/layout/domain/entities/layout.entity'
import { LayoutDataBuilder } from '@/layout/domain/testing/helpers/layout-data-builder'
import { NotFoundError } from '@/shared/domain/errors/not-found-error'
import { ConflictError } from '@/shared/domain/errors/conflict-error'
import { Test, TestingModule } from '@nestjs/testing'
import { DatabaseModule } from '@/shared/infrastructure/database/database.module'

describe('InvoicePrismaRepository integration tests', () => {
  let sut: InvoicePrismaRepository
  let module: TestingModule
  const prismaService = new PrismaClient()
  beforeAll(async () => {
    setupPrismaTests()
    module = await Test.createTestingModule({
      imports: [DatabaseModule.forTest(prismaService)],
    }).compile()
  })

  beforeEach(async () => {
    sut = new InvoicePrismaRepository(prismaService as any)
    await prismaService.invoiceItem.deleteMany()
    await prismaService.invoice.deleteMany()
    await prismaService.layout.deleteMany()
  })

  it('should throws error when entity not found', async () => {
    expect(() => sut.findById('fakeId')).rejects.toThrow(
      new NotFoundError('Invoice not found using ID fakeId'),
    )
  })

  it('should find an invoice by id', async () => {
    const layoutEntity = new LayoutEntity(LayoutDataBuilder())
    await prismaService.layout.create({ data: layoutEntity })
    const entity = new InvoiceEntity({
      ...InvoiceDataBuilder(),
      layoutId: layoutEntity.id,
    })

    await prismaService.invoice.create({
      data: {
        ...entity.toJSON(),
        items: {
          create: entity.items.map(item => item.toJSON()),
        },
      },
    })

    const result = await sut.findById(entity.id)

    expect(result.toJSON()).toEqual({
      ...entity.toJSON(),
      items: entity.items.map(i => ({
        ...i.toJSON(),
        invoiceId: entity.id,
      })),
    })
  })

  it('should throw an error if layoutId does not exist when inserting a new invoice', async () => {
    const entity = new InvoiceEntity(InvoiceDataBuilder())
    await expect(() => sut.insert(entity)).rejects.toThrow(
      new BadRequestError('Layout informado não existe'),
    )
  })

  it('should insert a new invoice', async () => {
    const layoutEntity = new LayoutEntity(LayoutDataBuilder())
    await prismaService.layout.create({ data: layoutEntity })
    const entity = new InvoiceEntity({
      ...InvoiceDataBuilder(),
      layoutId: layoutEntity.id,
    })

    await sut.insert(entity)
    const result = await sut.findById(entity.id)

    expect(result.toJSON()).toEqual({
      ...entity.toJSON(),
      items: entity.items.map(i => ({
        ...i.toJSON(),
        invoiceId: entity.id,
      })),
    })
  })

  it('should throw error when Invoice already imported', async () => {
    const layoutEntity = new LayoutEntity(LayoutDataBuilder())
    await prismaService.layout.create({ data: layoutEntity })
    const entity = new InvoiceEntity({
      ...InvoiceDataBuilder(),
      layoutId: layoutEntity.id,
    })

    await prismaService.invoice.create({
      data: {
        ...entity.toJSON(),
        items: {
          create: entity.items.map(item => item.toJSON()),
        },
      },
    })

    await expect(() =>
      sut.alreadyImported(entity.month, entity.year, entity.layoutId),
    ).rejects.toThrow(new ConflictError('Invoice has already imported'))
  })

  it('Should not find an invoice already imported', async () => {
    expect.assertions(0)
    await sut.alreadyImported(1, 2025, '92c4903b-59a3-4dfe-b217-08c312471f85')
  })

  it('Should return all invoices', async () => {
    const layoutEntity = new LayoutEntity(LayoutDataBuilder())
    await prismaService.layout.create({ data: layoutEntity })

    const invoices = Array.from(
      { length: 11 },
      (_, i) =>
        new InvoiceEntity({
          ...InvoiceDataBuilder(),
          month: i + 1,
          layoutId: layoutEntity.id,
        }),
    )

    await Promise.all(
      invoices.map(e =>
        prismaService.invoice.create({
          data: {
            ...e.toJSON(),
            items: { create: e.items.map(item => item.toJSON()) },
          },
        }),
      ),
    )

    const result = await sut.findAll()
    expect(result.length).toBe(invoices.length)
  })

  it('Should throw an error when updating an nonexistent invoice', async () => {
    const entity = new InvoiceEntity(InvoiceDataBuilder())
    await expect(() => sut.update(entity)).rejects.toThrow(
      new NotFoundError('Invoice not found using ID ' + entity.id),
    )
  })

  it('Should update an invoice', async () => {
    const layoutEntity = new LayoutEntity(LayoutDataBuilder())
    await prismaService.layout.create({ data: layoutEntity })
    const entity = new InvoiceEntity({
      ...InvoiceDataBuilder(),
      layoutId: layoutEntity.id,
    })

    await prismaService.invoice.create({
      data: {
        ...entity.toJSON(),
        items: {
          create: entity.items.map(item => item.toJSON()),
        },
      },
    })

    entity.month = 2
    entity.year = 2026
    await sut.update(entity)

    const output = await prismaService.invoice.findUnique({ where: { id: entity.id } })

    expect(output.month).toBe(2)
    expect(output.year).toBe(2026)
  })

  it('Should delete an invoice', async () => {
    const layoutEntity = new LayoutEntity(LayoutDataBuilder())
    await prismaService.layout.create({ data: layoutEntity })
    const entity = new InvoiceEntity({
      ...InvoiceDataBuilder(),
      layoutId: layoutEntity.id,
    })

    await prismaService.invoice.create({
      data: {
        ...entity.toJSON(),
        items: {
          create: entity.items.map(item => item.toJSON()),
        },
      },
    })

    await sut.delete(entity.id)

    const output = await prismaService.invoice.findUnique({ where: { id: entity.id } })

    expect(output).toBe(null)
  })
})
