import { CreateLayoutUseCase } from '@/layout/application/usecases/create-layout.usecase'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateLayoutDto implements CreateLayoutUseCase.Input {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  titleField: string

  @IsString()
  @IsNotEmpty()
  categoryField: string

  @IsString()
  @IsOptional()
  typeField?: string

  @IsString()
  @IsNotEmpty()
  amountField: string

  @IsString()
  @IsNotEmpty()
  dateField: string
}
