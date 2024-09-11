import { Module } from '@nestjs/common';
import { DeliveriesService } from './deliveries.service';
import { DeliveriesController } from './deliveries.controller';
import { DatabaseModule } from 'src/database/database.module';
import { deliveryProviders } from './deliveries.repository';
import { DeliveryGatewayGateway } from 'src/delivery-gateway/delivery-gateway.gateway';

@Module({
  imports: [DatabaseModule],
  controllers: [DeliveriesController],
  providers: [...deliveryProviders, DeliveriesService, DeliveryGatewayGateway],
})
export class DeliveriesModule {}
