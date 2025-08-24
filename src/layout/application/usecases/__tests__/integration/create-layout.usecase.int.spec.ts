import { LayoutPrismaRepository } from '@/layout/infrastructure/database/prisma/repositories/layout-prisma.repository'
import { CreateLayoutUseCase } from '../../create-layout.usecase'
import { PrismaClient } from '@prisma/client'
import { before } from 'node:test'

describe('CreateLayoutUseCase integration test', () => {
  const prismaService = new PrismaClient()
  let sut: CreateLayoutUseCase.UseCase
  let repository: LayoutPrismaRepository

  beforeAll(async () => {
    repository = new LayoutPrismaRepository(prismaService as any)
  })

  beforeEach(async () => {
    sut = new CreateLayoutUseCase.UseCase(repository)
    await prismaService.layout.deleteMany()
  })
  it('Should create a layout', async () => {
    const props = {
      name: 'test name 3',
      titleField: 'title',
      categoryField: 'category',
      typeField: 'type',
      amountField: 'amount',
      dateField: 'date',
    }
    const output = await sut.execute(props)
    expect(output.id).toBeDefined()
    const { id, ...outputWithouId } = output
    expect(outputWithouId).toStrictEqual(props)
  })
})
