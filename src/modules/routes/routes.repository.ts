import { DataSource } from 'typeorm';
import { Route } from './entities/route.entity';
import { DeliveryDetails } from '../detalles-entregas/entities/detalles-entregas.entity';

export const routesProviders = [
  {
    provide: 'ROUTES_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Route),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'DELIVERY_DETAILS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(DeliveryDetails),
    inject: ['DATA_SOURCE'],
  },
];
