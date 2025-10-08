import { PrismaClient } from '@prisma/client'
import { InvoicePrismaRepository } from '../../invoice-prisma.repository'
import { InvoiceEntity } from '@/invoice/domain/entities/invoice.entity'
import { InvoiceDataBuilder } from '@/invoice/domain/testing/helpers/invoice-data-builder'
import { setupPrismaTests } from '@/shared/infrastructure/database/prisma/testing/setup-prisma-tests'
import { BadRequestError } from '@/shared/application/errors/bad-request-error'

describe('InvoicePrismaRepository integration tests', () => {
  let sut: InvoicePrismaRepository
  const prismaService = new PrismaClient()
  beforeAll(() => {
    setupPrismaTests()
  })

  beforeEach(async () => {
    sut = new InvoicePrismaRepository(prismaService as any)
    await prismaService.layout.deleteMany()
  })

  it('should throw an error if layoutId does not exist when inserting a new invoice', async () => {
    const entity = new InvoiceEntity(InvoiceDataBuilder())
    await expect(() => sut.insert(entity)).rejects.toThrow(
      new BadRequestError('Layout informado não existe'),
    )
  })

  // it('should inserting a new invoice', async () => {
  //   const entity = new InvoiceEntity(InvoiceDataBuilder())
  //   await sut.insert(entity)
  //   const result = await prismaService.invoice.findUnique({ where: { id: entity.id } })

  //   expect(result).toStrictEqual(entity.toJSON())
  // })

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
