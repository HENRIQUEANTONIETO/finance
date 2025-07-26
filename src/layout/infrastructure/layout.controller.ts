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
import { CreateLayoutUseCase } from '../application/usecases/create-layout.usecase'
import { UpdateLayoutUseCase } from '../application/usecases/update-layout.usecase'
import { ListLayoutUseCase } from '../application/usecases/list-layout.usecase'
import { DeleteLayoutUseCase } from '../application/usecases/delete-layout.usecase'
import { CreateLayoutDto } from './dtos/create-layout.dto'
import { UpdateLayoutDto } from './dtos/update-layout.dto'
import { ListLayoutDto } from './dtos/list-layout.dto'
import { GetLayoutUseCase } from '../application/usecases/get-layout.usecase'

@Controller('layout')
export class LayoutController {
  @Inject(CreateLayoutUseCase.UseCase)
  private createLayoutUseCase: CreateLayoutUseCase.UseCase

  @Inject(UpdateLayoutUseCase.UseCase)
  private updateLayoutUseCase: UpdateLayoutUseCase.UseCase

  @Inject(ListLayoutUseCase.UseCase)
  private listLayoutUseCase: ListLayoutUseCase.UseCase

  @Inject(DeleteLayoutUseCase.UseCase)
  private deleteLayoutUseCase: DeleteLayoutUseCase.UseCase

  @Inject(GetLayoutUseCase.UseCase)
  private getLayoutUseCase: DeleteLayoutUseCase.UseCase

  @Post()
  async create(@Body() createLayoutDto: CreateLayoutDto) {
    return this.createLayoutUseCase.execute(createLayoutDto)
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateLayoutDto: UpdateLayoutDto) {
    return this.updateLayoutUseCase.execute({ id, ...updateLayoutDto })
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.getLayoutUseCase.execute({ id })
  }

  @Get()
  async search(@Query() searchParams: ListLayoutDto) {
    return this.listLayoutUseCase.execute(searchParams)
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.deleteLayoutUseCase.execute({ id })
  }
}
