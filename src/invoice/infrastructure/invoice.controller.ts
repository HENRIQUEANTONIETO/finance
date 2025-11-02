import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common'
import { CreateInvoiceUseCase } from '../application/usecases/invoice/create-invoice.usecase'
import { UpdateInvoiceUseCase } from '../application/usecases/invoice/update-invoice.usecase'
import { ListInvoiceUseCase } from '../application/usecases/invoice/list-invoice.usecase'
import { DeleteInvoiceUseCase } from '../application/usecases/invoice/delete-invoice.usecase'
import { CreateInvoiceDto } from './dtos/create-invoice.dto'
import { UpdateInvoiceDto } from './dtos/update-invoice.dto'
import { ListInvoiceDto } from './dtos/list-invoice.dto'
//import { GetInvoiceUseCase } from '../application/usecases/invoice/get-invoice.usecase'

@Controller('invoice')
export class InvoiceController {
  @Inject(CreateInvoiceUseCase.UseCase)
  private createInvoiceUseCase: CreateInvoiceUseCase.UseCase

  @Inject(UpdateInvoiceUseCase.UseCase)
  private updateInvoiceUseCase: UpdateInvoiceUseCase.UseCase

  @Inject(ListInvoiceUseCase.UseCase)
  private listInvoiceUseCase: ListInvoiceUseCase.UseCase

  @Inject(DeleteInvoiceUseCase.UseCase)
  private deleteInvoiceUseCase: DeleteInvoiceUseCase.UseCase

  //   @Inject(GetInvoiceUseCase.UseCase)
  //   private getInvoiceUseCase: GetInvoiceUseCase.UseCase

  @Post()
  async create(@Body() createInvoiceDto: CreateInvoiceDto) {
    return this.createInvoiceUseCase.execute(createInvoiceDto)
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto) {
    return this.updateInvoiceUseCase.execute({ id, ...updateInvoiceDto })
  }

  //   @Get(':id')
  //   async findOne(@Param('id') id: string) {
  //     return this.getInvoiceUseCase.execute({ id })
  //   }

  @Get()
  async search(@Query() searchParams: ListInvoiceDto) {
    return this.listInvoiceUseCase.execute(searchParams)
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.deleteInvoiceUseCase.execute({ id })
  }
}
