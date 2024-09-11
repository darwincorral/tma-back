import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ModulesModule } from './modules/modules.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import configuration from './configuration/configuration';
import { DeliveryGatewayGateway } from './delivery-gateway/delivery-gateway.gateway';
require('dotenv').config();

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: `./env/${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    ModulesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, DeliveryGatewayGateway],
})
export class AppModule {}
