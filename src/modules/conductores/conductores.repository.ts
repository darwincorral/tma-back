import { DataSource } from 'typeorm';
import { Drivers } from './entities/conductor.entity';

export const conductorProviders = [
  {
    provide: 'CONDUCTOR_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Drivers),
    inject: ['DATA_SOURCE'],
  },
];
