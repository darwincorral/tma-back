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
    private conductorRepository: Repository<Drivers>,
  ) {}

  async create(createConductorDto: CreateConductorDto) {
    try {
      // Verificar si ya existe un usuario con la misma identificación
      const existingUser = await this.conductorRepository.findOne({
        where: 
          { 
           identification: createConductorDto.identification,
           mail: createConductorDto.mail,
           status:'ACT' 
          }
      });
      if (existingUser) {
        throw new HttpException(
          {
            message: 'Usuario ya registrado',
            codRetorno: '0010',
          },
          203,
          {
            cause: new Error('test'),
            description: 'test',
          },
        );
      }

      // Si no existe, proceder a crear el nuevo usuario
      const objTransporteDto = this.conductorRepository.create(createConductorDto);
      const resp = await this.conductorRepository.save(objTransporteDto);
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
      const resp = await this.conductorRepository.findBy(findConductorDto);
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

  async findOne(id: number) {
    try {
      const resp = await this.conductorRepository.findOne({
        where: { 
          id:id, 
          status:'ACT'
        }, 
        relations: ['vehicle'],         // Incluyendo los productos asociados
      });
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
      const resp = await this.conductorRepository.update(id, updateConductorDto);
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
      const respUpdate = await this.conductorRepository.update(
        id,
        updateConductorDto,
      );

      const resp = await this.conductorRepository.softDelete(id);

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
