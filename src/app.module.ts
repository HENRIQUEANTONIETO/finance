import { Module } from '@nestjs/common'
import { LayoutModule } from './layout/infrastructure/layout.module'
import { DatabaseModule } from './shared/infrastructure/database/database.module'
import { EnvConfigModule } from './shared/infrastructure/env-config/env-config.module'

@Module({
  imports: [EnvConfigModule, LayoutModule, DatabaseModule],
})
export class AppModule {}
