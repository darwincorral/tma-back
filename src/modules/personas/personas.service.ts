import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ErrorMessage } from 'src/configuration/error-messages';
import { People } from './entities/persona.entity';
import { CreatePersonasDto } from './dto/create-personas.dto';
import { UpdatePersonasDto } from './dto/update-personas.dto';
import { FindPersonasDto } from './dto/find-personas.dto';

@Injectable()
export class PersonasService {
  constructor(
    @Inject('PERSONA_REPOSITORY')
    private personaRepository: Repository<People>,
  ) {}

  async create(createPersonasDto: CreatePersonasDto) {
    try {
      const objTransporteDto =
        await this.personaRepository.create(createPersonasDto);
      const resp = await this.personaRepository.save(objTransporteDto);
      return resp;
    } catch (error) {
      throw new HttpException(
        {
          message: error.response.message || ErrorMessage.ERROR_SERVICE.message,
          codRetorno:
            error.response.codRetorno || ErrorMessage.ERROR_SERVICE.codRetorno,
        },
        error.status || ErrorMessage.ERROR_SERVICE.status,
        {
          cause: new Error(error.options.cause || error),
          description: error.options.description || error.message,
        },
      );
    }
  }

  async findAll(findPersonasDto: FindPersonasDto): Promise<People[]> {
    try {
      const resp = await this.personaRepository.findBy(findPersonasDto);
      return resp;
    } catch (error) {
      throw new HttpException(
        {
          message: error.response.message || ErrorMessage.ERROR_SERVICE.message,
          codRetorno:
            error.response.codRetorno || ErrorMessage.ERROR_SERVICE.codRetorno,
        },
        error.status || ErrorMessage.ERROR_SERVICE.status,
        {
          cause: new Error(error.options.cause || error),
          description: error.options.description || error.message,
        },
      );
    }
  }

  async findOne(findPersonasDto: FindPersonasDto) {
    try {
      const resp = await this.personaRepository.findOneBy(findPersonasDto);
      return resp;
    } catch (error) {
      throw new HttpException(
        {
          message: error.response.message || ErrorMessage.ERROR_SERVICE.message,
          codRetorno:
            error.response.codRetorno || ErrorMessage.ERROR_SERVICE.codRetorno,
        },
        error.status || ErrorMessage.ERROR_SERVICE.status,
        {
          cause: new Error(error.options.cause || error),
          description: error.options.description || error.message,
        },
      );
    }
  }

  async update(id: number, updatePersonasDto: UpdatePersonasDto) {
    try {
      const resp = await this.personaRepository.update(id, updatePersonasDto);
      return resp;
    } catch (error) {
      throw new HttpException(
        {
          message: error.response.message || ErrorMessage.ERROR_SERVICE.message,
          codRetorno:
            error.response.codRetorno || ErrorMessage.ERROR_SERVICE.codRetorno,
        },
        error.status || ErrorMessage.ERROR_SERVICE.status,
        {
          cause: new Error(error.options.cause || error),
          description: error.options.description || error.message,
        },
      );
    }
  }

  async remove(id: number, updatePersonasDto: UpdatePersonasDto) {
    try {
      const respUpdate = await this.personaRepository.update(
        id,
        updatePersonasDto,
      );

      const resp = await this.personaRepository.softDelete(id);

      return resp;
    } catch (error) {
      throw new HttpException(
        {
          message: error.response.message || ErrorMessage.ERROR_SERVICE.message,
          codRetorno:
            error.response.codRetorno || ErrorMessage.ERROR_SERVICE.codRetorno,
        },
        error.status || ErrorMessage.ERROR_SERVICE.status,
        {
          cause: new Error(error.options.cause || error),
          description: error.options.description || error.message,
        },
      );
    }
  }
}
