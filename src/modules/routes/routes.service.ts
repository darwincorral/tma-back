import { HttpException, Inject, Injectable } from '@nestjs/common';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { Repository } from 'typeorm';
import { Route } from './entities/route.entity';
import { ErrorMessage } from 'src/configuration/error-messages';
import { FindRouteDto } from './dto/find-route.dto';
import { DeliveryGatewayGateway } from 'src/delivery-gateway/delivery-gateway.gateway';
import { DeliveryDetails } from '../detalles-entregas/entities/detalles-entregas.entity';

@Injectable()
export class RoutesService {
  constructor(
    @Inject('ROUTES_REPOSITORY')
    private providersRepository: Repository<Route>,

    private readonly deliveryGateway: DeliveryGatewayGateway,

    @Inject('DELIVERY_DETAILS_REPOSITORY')
    private deliveryDetailsRepository: Repository<DeliveryDetails>,
  ) {}

  async create(createRouteDto: CreateRouteDto) {
    try {
      const objTransporteDto =
        await this.providersRepository.create(createRouteDto);
      const resp:any = await this.providersRepository.save({
        ...objTransporteDto,
        objTransporteDto,
      });


      // Obtener el DeliveryDetails completo con sus relaciones después de guardar la ruta
      const deliveryDetails = await this.deliveryDetailsRepository.findOne({
      where: { id: resp.deliveryDetails }, // Asegúrate de tener la relación con DeliveryDetails
        relations: [
          'route',
        ],
      });

      // Emitir evento de creación de entrega con el delivery completo
      this.deliveryGateway.emitRouteLive(deliveryDetails);

      return deliveryDetails;
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

  async findAll(findRouteDto: FindRouteDto): Promise<Route[]> {
    try {
      const resp = await this.providersRepository.findBy(findRouteDto);
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

  async findOne(findRouteDto: FindRouteDto) {
    try {
      const resp = await this.providersRepository.findOneBy(findRouteDto);
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

  async update(id: number, updateRouteDto: UpdateRouteDto) {
    try {
      const resp = await this.providersRepository.update(id, updateRouteDto);
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

  async remove(id: number, updateRouteDto: UpdateRouteDto) {
    try {
      const respUpdate = await this.providersRepository.update(
        id,
        updateRouteDto,
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
