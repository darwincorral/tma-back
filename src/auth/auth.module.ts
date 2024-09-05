import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { personaProviders } from 'src/modules/personas/personas.repository';
import { DatabaseModule } from 'src/database/database.module';
import { conductorProviders } from 'src/modules/conductores/conductores.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [AuthController],
  providers: [AuthService,...personaProviders, ...conductorProviders]
})
export class AuthModule {}
