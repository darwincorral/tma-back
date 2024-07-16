import { Module } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { RoutesController } from './routes.controller';
import { routesProviders } from './routes.repository';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [RoutesController],
  providers: [...routesProviders, RoutesService],
})
export class RoutesModule {}
