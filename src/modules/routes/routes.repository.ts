import { DataSource } from 'typeorm';
import { Route } from './entities/route.entity';

export const routesProviders = [
  {
    provide: 'ROUTES_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Route),
    inject: ['DATA_SOURCE'],
  },
];
