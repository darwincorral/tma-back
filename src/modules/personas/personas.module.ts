import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/database/database.module';
import { PersonasController } from './personas.controller';
import { PersonasService } from './personas.service';
import { personaProviders } from './personas.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [PersonasController],
  providers: [...personaProviders, PersonasService],
})
export class PersonasModule {}
