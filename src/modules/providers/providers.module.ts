import { Module } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { ProvidersController } from './providers.controller';
import { providersProviders } from './providers.repository';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ProvidersController],
  providers: [...providersProviders, ProvidersService],
})
export class ProvidersModule {}
