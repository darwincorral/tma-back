import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/database/database.module';
import { conductorProviders } from '../conductores/conductores.repository';
import { DeliveryDetailsController } from './detalles-entregas.controller';
import { DeliveryDetailsService } from './detalles-entregas.service';
import { deliveryDetailsProviders } from './detalles-entregas.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [DeliveryDetailsController],
  providers: [...deliveryDetailsProviders, DeliveryDetailsService],
})
export class DetallesEntregasModule {}
