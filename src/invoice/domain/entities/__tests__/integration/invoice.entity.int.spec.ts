describe('Invoice integration tests', () => {
  it('should create a list of invoice', () => {
    const interInvoice = {
      modelId: 1,
      invoice: [
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

    // const invoiceModelRepository = new invoiceModelRepository()
    // const model = invoiceModelRepository.find(interInvoice.modelId)
    // model.invoice = interInvoice.invoice
  })
})
