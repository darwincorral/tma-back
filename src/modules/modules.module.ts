import { Module } from '@nestjs/common';
import { TransportesModule } from './transportes/transportes.module';
import { PersonasModule } from './personas/personas.module';
import { ConductoresModule } from './conductores/conductores.module';
import { DetallesEntregasModule } from './detalles-entregas/detalles-entregas.module';
import { RoutesModule } from './routes/routes.module';
import { DeliveriesModule } from './deliveries/deliveries.module';
import { ProductsModule } from './products/products.module';
import { ProvidersModule } from './providers/providers.module';

@Module({
  imports: [
    TransportesModule,
    PersonasModule,
    ConductoresModule,
    DetallesEntregasModule,
    RoutesModule,
    DeliveriesModule,
    ProductsModule,
    ProvidersModule,
  ],
  providers: [],
  exports: [],
})
export class ModulesModule {}
