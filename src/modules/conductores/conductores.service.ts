import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ErrorMessage } from 'src/configuration/error-messages';
import { Drivers } from './entities/conductor.entity';
import { CreateConductorDto } from './dto/create-conductor.dto';
import { FindConductorDto } from './dto/find-conductor';
import { UpdateConductorDto } from './dto/update-conductor.dto';

@Injectable()
export class ConductoresService {
  constructor(
    @Inject('CONDUCTOR_REPOSITORY')
    private personaRepository: Repository<Drivers>,
  ) {}

  async create(createConductorDto: CreateConductorDto) {
    try {
      const objTransporteDto =
        await this.personaRepository.create(createConductorDto);
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

  async findAll(findConductorDto: FindConductorDto): Promise<Drivers[]> {
    try {
      const resp = await this.personaRepository.findBy(findConductorDto);
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

  async findOne(findConductorDto: FindConductorDto) {
    try {
      const resp = await this.personaRepository.findOneBy(findConductorDto);
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

  async update(id: number, updateConductorDto: UpdateConductorDto) {
    try {
      const resp = await this.personaRepository.update(id, updateConductorDto);
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

  async remove(id: number, updateConductorDto: UpdateConductorDto) {
    try {
      const respUpdate = await this.personaRepository.update(
        id,
        updateConductorDto,
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
