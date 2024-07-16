import { DataSource } from 'typeorm';
import { Vehicle } from './entities/transporte.entity';

export const transporteProviders = [
  {
    provide: 'TRANSPORTE_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Vehicle),
    inject: ['DATA_SOURCE'],
  },
];