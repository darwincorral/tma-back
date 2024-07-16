import { HttpException, Inject, Injectable } from '@nestjs/common';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { Repository } from 'typeorm';
import { Delivery } from './entities/delivery.entity';
import { ErrorMessage } from 'src/configuration/error-messages';
import { FindDeliveryDto } from './dto/find-delivery.dto';

@Injectable()
export class DeliveriesService {
  constructor(
    @Inject('DELIVERY_REPOSITORY')
    private deliveryRepository: Repository<Delivery>,
  ) {}

  async create(createDeliveryDto: CreateDeliveryDto) {
    try {
      const objTransporteDto =
        await this.deliveryRepository.create(createDeliveryDto);
      const resp = await this.deliveryRepository.save({
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

  async findAll(findDeliveryDto: FindDeliveryDto): Promise<Delivery[]> {
    try {
      const resp = await this.deliveryRepository.findBy(findDeliveryDto);
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

  async findOne(findDeliveryDto: FindDeliveryDto) {
    try {
      const resp = await this.deliveryRepository.findOneBy(findDeliveryDto);
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

  async update(id: number, updateDeliveryDto: UpdateDeliveryDto) {
    try {
      const resp = await this.deliveryRepository.update(id, updateDeliveryDto);
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

  async remove(id: number, updateDeliveryDto: UpdateDeliveryDto) {
    try {
      const respUpdate = await this.deliveryRepository.update(
        id,
        updateDeliveryDto,
      );

      const resp = await this.deliveryRepository.softDelete(id);

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
