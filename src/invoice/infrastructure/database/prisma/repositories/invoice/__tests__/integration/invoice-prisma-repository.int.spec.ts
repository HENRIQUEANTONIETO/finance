import { PrismaClient } from '@prisma/client'
import { InvoicePrismaRepository } from '../../invoice-prisma.repository'
import { InvoiceEntity } from '@/invoice/domain/entities/invoice.entity'
import { InvoiceDataBuilder } from '@/invoice/domain/testing/helpers/invoice-data-builder'
import { setupPrismaTests } from '@/shared/infrastructure/database/prisma/testing/setup-prisma-tests'
import { BadRequestError } from '@/shared/application/errors/bad-request-error'
import { LayoutEntity } from '@/layout/domain/entities/layout.entity'
import { LayoutDataBuilder } from '@/layout/domain/testing/helpers/layout-data-builder'
import { NotFoundError } from '@/shared/domain/errors/not-found-error'

describe('InvoicePrismaRepository integration tests', () => {
  let sut: InvoicePrismaRepository
  const prismaService = new PrismaClient()
  beforeAll(() => {
    setupPrismaTests()
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

  // it('should throw error when Invoice already imported', async () => {
  //   const entity = new InvoiceEntity(InvoiceDataBuilder())
  //   await prismaService.invoice.create({ data: { ...entity.toJSON() } })
  //   await expect(() => sut.invoiceExists(entity.name)).rejects.toThrow(
  //     new ConflictError('Layout already exists'),
  //   )
  // })

  // it('Should not find a invoice by name', async () => {
  //   expect.assertions(0)
  //   await sut.invoiceExists('teste')
  // })
})
