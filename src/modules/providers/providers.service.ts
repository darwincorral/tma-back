import { HttpException, Inject, Injectable } from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { Repository } from 'typeorm';
import { Provider } from './entities/provider.entity';
import { ErrorMessage } from 'src/configuration/error-messages';
import { FindProviderDto } from './dto/find-provider.dto';

@Injectable()
export class ProvidersService {
  constructor(
    @Inject('PROVIDERS_REPOSITORY')
    private providersRepository: Repository<Provider>,
  ) {}

  async create(createProviderDto: CreateProviderDto) {
    try {
      const objTransporteDto =
        await this.providersRepository.create(createProviderDto);
      const resp = await this.providersRepository.save({
        ...objTransporteDto,
        objTransporteDto,
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

  async findAll(findProviderDto: FindProviderDto): Promise<Provider[]> {
    try {
      const resp = await this.providersRepository.findBy(findProviderDto);
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

  async findOne(findProviderDto: FindProviderDto) {
    try {
      const resp = await this.providersRepository.findOneBy(findProviderDto);
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

  async update(id: number, updateProviderDto: UpdateProviderDto) {
    try {
      const resp = await this.providersRepository.update(id, updateProviderDto);
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

  async remove(id: number, updateProviderDto: UpdateProviderDto) {
    try {
      const respUpdate = await this.providersRepository.update(
        id,
        updateProviderDto,
      );

      const resp = await this.providersRepository.softDelete(id);

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
