import { Module } from '@nestjs/common'
import { LayoutModule } from './layout/infrastructure/layout.module'

@Module({
  imports: [LayoutModule],
})
export class AppModule {}
