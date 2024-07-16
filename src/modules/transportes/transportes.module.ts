import { Module } from '@nestjs/common';
import { TransportesService } from './transportes.service';
import { TransportesController } from './transportes.controller';
import { transporteProviders } from './transportes.repository';
import { DatabaseModule } from 'src/database/database.module';
import { conductorProviders } from '../conductores/conductores.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [TransportesController],
  providers: [
    ...transporteProviders,
    ...conductorProviders,
    TransportesService,
  ],
})
export class TransportesModule {}
