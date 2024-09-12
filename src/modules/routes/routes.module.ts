import { Module } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { RoutesController } from './routes.controller';
import { routesProviders } from './routes.repository';
import { DatabaseModule } from 'src/database/database.module';
import { DeliveryGatewayGateway } from 'src/delivery-gateway/delivery-gateway.gateway';

@Module({
  imports: [DatabaseModule],
  controllers: [RoutesController],
  providers: [...routesProviders, RoutesService, DeliveryGatewayGateway],
})
export class RoutesModule {}
