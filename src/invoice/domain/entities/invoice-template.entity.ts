import { randomUUID } from 'node:crypto'
import { Invoice } from './invoice.entity'

export class InvoiceTemplate {
  public readonly id: string
  public readonly name: string
  public readonly descriptionField: string
  public readonly categoryField: string
  public readonly typeField: string
  public readonly amountField: number

  constructor(
    name: string,
    descriptionField: string,
    categoryField: string,
    typeField: string,
    amountField: number,
  ) {
    this.id = randomUUID()
    this.name = name
    this.descriptionField = descriptionField
    this.categoryField = categoryField
    this.typeField = typeField
    this.amountField = amountField
  }

  public static toInvoice(invoiceTemplate: InvoiceTemplate): Invoice {
    return new Invoice(
      invoiceTemplate.descriptionField,
      invoiceTemplate.categoryField,
      invoiceTemplate.typeField,
      invoiceTemplate.amountField,
    )
  }
}
