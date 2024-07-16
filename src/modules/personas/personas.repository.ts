import { DataSource } from 'typeorm';
import { People } from './entities/persona.entity';

export const personaProviders = [
  {
    provide: 'PERSONA_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(People),
    inject: ['DATA_SOURCE'],
  },
];
