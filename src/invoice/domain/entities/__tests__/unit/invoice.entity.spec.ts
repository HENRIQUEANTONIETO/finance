import { Invoice } from '../../invoice.entity'

describe('Invoice unit tests', () => {
  it('should create an invoice', () => {
    // Arrange
    const description = 'Test description'
    const category = 'Test category'
    const type = 'Test type'
    const amount = 100
    // Act
    const invoice = new Invoice(description, category, type, amount)
    // Assert
    expect(invoice.id).toBeDefined()
    expect(invoice.description).toBe(description)
    expect(invoice.category).toBe(category)
    expect(invoice.type).toBe(type)
    expect(invoice.amount).toBe(amount)
  })
})
