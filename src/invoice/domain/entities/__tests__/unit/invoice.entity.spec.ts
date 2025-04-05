import { Invoice } from '../../invoice.entity'

describe('Invoice unit tests', () => {
  it('should create an invoice', () => {
    // Arrange
    const title = 'Test title'
    const category = 'Test category'
    const type = 'Test type'
    const amount = 100
    // Act
    const invoice = new Invoice(title, category, type, amount)
    // Assert
    expect(invoice.id).toBeDefined()
    expect(invoice.title).toBe(title)
    expect(invoice.category).toBe(category)
    expect(invoice.type).toBe(type)
    expect(invoice.amount).toBe(amount)
  })
})
