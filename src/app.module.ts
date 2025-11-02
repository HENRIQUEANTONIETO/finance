import { Module } from '@nestjs/common'
import { LayoutModule } from './layout/infrastructure/layout.module'
import { DatabaseModule } from './shared/infrastructure/database/database.module'
import { EnvConfigModule } from './shared/infrastructure/env-config/env-config.module'
import { InvoiceController } from './invoice/infrastructure/invoice.controller'
import { InvoiceModule } from './invoice/infrastructure/invoice.module'

@Module({
  imports: [EnvConfigModule, LayoutModule, DatabaseModule, InvoiceModule],
  controllers: [InvoiceController],
})
export class AppModule {}
