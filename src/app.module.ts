import { Module } from '@nestjs/common'
import { LayoutModule } from './layout/infrastructure/layout.module'
import { DatabaseModule } from './shared/infrastructure/database/database.module';

@Module({
  imports: [LayoutModule, DatabaseModule],
})
export class AppModule {}
