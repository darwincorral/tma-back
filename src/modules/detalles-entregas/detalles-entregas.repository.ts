import { DataSource } from 'typeorm';
import { DeliveryDetails } from './entities/detalles-entregas.entity';

export const deliveryDetailsProviders = [
  {
    provide: 'DETALLE_ENTREGA_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(DeliveryDetails),
    inject: ['DATA_SOURCE'],
  },
];
