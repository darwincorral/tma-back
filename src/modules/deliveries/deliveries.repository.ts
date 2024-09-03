import { DataSource } from 'typeorm';
import { Delivery } from './entities/delivery.entity';
import { DeliveryDetails } from 'src/modules/detalles-entregas/entities/detalles-entregas.entity';
import { Route } from 'src/modules/routes/entities/route.entity';

export const deliveryProviders = [
  {
    provide: 'DELIVERY_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Delivery),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'DELIVERY_DETAILS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(DeliveryDetails),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'ROUTE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Route),
    inject: ['DATA_SOURCE'],
  },
];
