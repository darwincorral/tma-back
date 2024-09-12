import { HttpException, Inject, Injectable } from '@nestjs/common';
import { DeliveryDetails } from './entities/detalles-entregas.entity';
import { Between, Repository } from 'typeorm';
import { CreateDeliveryDetailsDto } from './dto/create-detalles-entregas.dto';
import { ErrorMessage } from 'src/configuration/error-messages';
import { FindDeliveryDetailsDto } from './dto/find-detalles-entregas.dto';
import { UpdateDeliveryDetailsDto } from './dto/update-detalles-entregas.dto';
import * as moment from 'moment';
import { DeliveryGatewayGateway } from 'src/delivery-gateway/delivery-gateway.gateway';

@Injectable()
export class DeliveryDetailsService {
  constructor(
    @Inject('DETALLE_ENTREGA_REPOSITORY')
    private deliveryDetailsRepository: Repository<DeliveryDetails>,

    private readonly deliveryGateway: DeliveryGatewayGateway,
  ) {}

  async create(createDeliveryDetailsDto: CreateDeliveryDetailsDto) {
    try {
      // const respObjDrivers = await this.conductorRepository.findOneBy({
      //   id: createDeliveryDetailsDto.drivers,
      // });
      // if (!respObjDrivers) {
      //   throw new HttpException(
      //     {
      //       message: ErrorMessage.dataNotFound.message,
      //       codRetorno: ErrorMessage.dataNotFound.codRetorno,
      //     },
      //     ErrorMessage.dataNotFound.status,
      //     {
      //       cause: new Error(ErrorMessage.dataNotFound.message),
      //       description: ErrorMessage.dataNotFound.message,
      //     },
      //   );
      // }
      const objTransporteDto = await this.deliveryDetailsRepository.create(
        createDeliveryDetailsDto,
      );
      const resp = await this.deliveryDetailsRepository.save({
        ...objTransporteDto,
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

async findAll(
  findDeliveryDetailsDto: FindDeliveryDetailsDto,
): Promise<DeliveryDetails[]> {
  try {
    const { vehicle, people, ...otherFilters } = findDeliveryDetailsDto;

    // Construye las condiciones de búsqueda
    const conditions: any = { ...otherFilters };

    // Filtrar por vehículo si se proporciona
    if (vehicle) {
      conditions.vehicle = { id: vehicle };
    }

    // Filtrar por persona si se proporciona
    if (people) {
      conditions.people = { id: people };
    }

    // Filtrar por fecha si se proporciona
    if (otherFilters.dateCreated) {
      const startOfDayUTC = moment(otherFilters.dateCreated).startOf('day').toDate();
      const endOfDayUTC = moment(otherFilters.dateCreated).endOf('day').toDate();

      conditions.dateCreated = Between(startOfDayUTC, endOfDayUTC);
    }

    // Utilizando QueryBuilder para filtrar las relaciones de route
    const resp = await this.deliveryDetailsRepository
      .createQueryBuilder('deliveryDetails')
      .leftJoinAndSelect('deliveryDetails.vehicle', 'vehicle')
      .leftJoinAndSelect('vehicle.drivers', 'drivers')
      .leftJoinAndSelect('deliveryDetails.people', 'people')
      .leftJoinAndSelect('deliveryDetails.product', 'product')
      .leftJoinAndSelect('deliveryDetails.route', 'route', 'route.type != :type', { type: 'SEGUIMIENTO' }) // Filtra las rutas que no sean de tipo 'SEGUIMIENTO'
      .where(conditions)
      .orderBy('deliveryDetails.dateCreated', 'DESC')
      .getMany();

    return resp;
  } catch (error) {
    throw new HttpException(
      {
        message: error.response?.message || ErrorMessage.ERROR_SERVICE.message,
        codRetorno: error.response?.codRetorno || ErrorMessage.ERROR_SERVICE.codRetorno,
      },
      error.status || ErrorMessage.ERROR_SERVICE.status,
      {
        cause: new Error(error.options?.cause || error),
        description: error.options?.description || error.message,
      },
    );
  }
}

  async findOne(findDeliveryDetailsDto: FindDeliveryDetailsDto) {
    try {
      const resp = await this.deliveryDetailsRepository.findOneBy(
        findDeliveryDetailsDto,
      );
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

  async update(id: number, updateDeliveryDetailsDto: UpdateDeliveryDetailsDto) {
    try {
      const resp = await this.deliveryDetailsRepository.update(
        id,
        updateDeliveryDetailsDto,
      );
      
      // Emitir evento de actualización con lista 
      this.deliveryGateway.emitDeliveryUpdate(resp);

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

  async remove(id: number, updateDeliveryDetailsDto: UpdateDeliveryDetailsDto) {
    try {
      const respUpdate = await this.deliveryDetailsRepository.update(
        id,
        updateDeliveryDetailsDto,
      );

      const resp = await this.deliveryDetailsRepository.softDelete(id);

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
