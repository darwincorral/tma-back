import {
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ErrorMessage } from 'src/configuration/error-messages';
import { People } from 'src/modules/personas/entities/persona.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @Inject('PERSONA_REPOSITORY')
    private readonly peopleRepository: Repository<People>,
  ) {}

  async login(email: string, password: string) {
    // Buscar al usuario por correo electrónico
    try {
      const user = await this.peopleRepository.findOne({
        where: { mail: email },
      });
      // Verificar si el usuario existe y la contraseña es correcta
      if (user && user.password === password) {
        return user;
      } else {
        throw new HttpException(
          {
            message: 'No se encuentra el usuario',
            codRetorno: '0010',
          },
          203,
          {
            cause: new Error('test'),
            description: 'test',
          },
        );
      }
    } catch (error) {
      throw new HttpException(
        {
          message: error.response?.message || ErrorMessage.ERROR_SERVICE.message,
          codRetorno:
            error.response?.codRetorno || ErrorMessage.ERROR_SERVICE.codRetorno,
        },
        error.status || ErrorMessage.ERROR_SERVICE.status,
        {
          cause: new Error(error.options?.cause || error.stack),
          description: error.options?.description || error.message,
        },
      );
    }
  }
}
