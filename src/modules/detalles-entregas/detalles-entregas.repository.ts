import { DataSource } from 'typeorm';
import { DeliveryDetails } from './entities/detalles-entregas.entity';
import { Route } from '../routes/entities/route.entity';

export const deliveryDetailsProviders = [
  {
    provide: 'DETALLE_ENTREGA_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(DeliveryDetails),
    inject: ['DATA_SOURCE'],
  },
  
  {
    provide: 'ROUTE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Route),
    inject: ['DATA_SOURCE'],
  },
];
