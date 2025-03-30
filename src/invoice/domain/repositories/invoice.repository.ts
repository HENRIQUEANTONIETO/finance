import { InvoiceTemplate } from '../entities/invoice-template.entity'

export interface InvoiceRepository {
  create(model: InvoiceTemplate, invoice: any): Promise<void>
}

function create(model: InvoiceTemplate, invoice: any) {}
