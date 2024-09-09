import { HttpException, Inject, Injectable } from '@nestjs/common';
import { DeliveryDetails } from './entities/detalles-entregas.entity';
import { Repository } from 'typeorm';
import { CreateDeliveryDetailsDto } from './dto/create-detalles-entregas.dto';
import { ErrorMessage } from 'src/configuration/error-messages';
import { FindDeliveryDetailsDto } from './dto/find-detalles-entregas.dto';
import { UpdateDeliveryDetailsDto } from './dto/update-detalles-entregas.dto';

@Injectable()
export class DeliveryDetailsService {
  constructor(
    @Inject('DETALLE_ENTREGA_REPOSITORY')
    private deliveryDetailsRepository: Repository<DeliveryDetails>,
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
  
      // Si el vehículo está presente en los filtros, asegúrate de filtrar por el ID del vehículo
      if (vehicle) {
        conditions.vehicle = { id: vehicle }; // Filtrar por el ID del vehículo
      }

      // Si el vehículo está presente en los filtros, asegúrate de filtrar por el ID del vehículo
      if (people) {
        conditions.people = { id: people }; // Filtrar por el ID del vehículo
      }
      
      const resp = await this.deliveryDetailsRepository.find({
          where: conditions,
          relations:[
            'vehicle',
            'route',
            'people',
            'product',
          ]
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
