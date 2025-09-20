// shared/infrastructure/database/database.module.ts
import { Global, Module, DynamicModule } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { EnvConfigModule } from '../env-config/env-config.module'
import { PrismaClient } from '@prisma/client'

@Global()
@Module({
  imports: [EnvConfigModule], // EnvConfigModule já traz ConfigModule.forRoot() e isGlobal
  providers: [PrismaService],
  exports: [PrismaService],
})
export class DatabaseModule {
  static forTest(prismaClient: PrismaClient): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [
        {
          provide: PrismaService,
          useFactory: () => prismaClient as unknown as PrismaService,
        },
      ],
      exports: [PrismaService],
    }
  }
}
