import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/database/database.module';
import { ConductoresController } from './conductores.controller';
import { conductorProviders } from './conductores.repository';
import { ConductoresService } from './conductores.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ConductoresController],
  providers: [...conductorProviders, ConductoresService],
})
export class ConductoresModule {}
