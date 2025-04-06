describe('InvoiceItem integration tests', () => {
  it('should create a list of invoiceItem', () => {
    const interInvoiceItem = {
      modelId: 1,
      invoiceItem: [
        {
          Data: '22/03/2025',
          Lançamento: 'Supermercado do Zé',
          Categoria: 'SUPERMERCADO',
          Tipo: 'Compra à vista',
          Valor: 'R$ 130,84',
        },
        {
          Data: '22/03/2025',
          Lançamento: 'Posto Ipiranga',
          Categoria: 'COMBUSTÍVEL',
          Tipo: 'Compra à vista',
          Valor: 'R$ 123,44',
        },
        {
          Data: '12/03/2025',
          Lançamento: 'Mercadolivre*vkonlin',
          Categoria: 'COMPRAS',
          Tipo: 'Parcela 3/3',
          Valor: 'R$ 26,32',
        },
      ],
    }

    // const invoiceItemModelRepository = new invoiceItemModelRepository()
    // const model = invoiceItemModelRepository.find(interInvoiceItem.modelId)
    // model.invoiceItem = interInvoiceItem.invoiceItem
  })
})
