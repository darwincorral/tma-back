import { DataSource } from 'typeorm';
import { Provider } from './entities/provider.entity';

export const providersProviders = [
  {
    provide: 'PROVIDERS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Provider),
    inject: ['DATA_SOURCE'],
  },
];
