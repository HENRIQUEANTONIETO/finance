// shared/infrastructure/env-config/env-config.module.ts
import { Module } from '@nestjs/common'
import { EnvConfigService } from './env-config.service'
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config'
import { join } from 'node:path'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        join(process.cwd(), `.env.${process.env.NODE_ENV || 'development'}`),
        join(process.cwd(), `.env`),
      ],
      // opcional: load: [configFactory]
    } as ConfigModuleOptions),
  ],
  providers: [EnvConfigService],
  exports: [EnvConfigService],
})
export class EnvConfigModule {}
