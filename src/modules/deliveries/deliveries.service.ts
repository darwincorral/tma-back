import { HttpException, Inject, Injectable } from '@nestjs/common';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { Repository } from 'typeorm';
import { Delivery } from './entities/delivery.entity';
import { ErrorMessage } from 'src/configuration/error-messages';
import { FindDeliveryDto } from './dto/find-delivery.dto';
import { DeliveryDetails } from '../detalles-entregas/entities/detalles-entregas.entity';
import { Route } from '../routes/entities/route.entity';

@Injectable()
export class DeliveriesService {
  constructor(
    @Inject('DELIVERY_REPOSITORY')
    private deliveryRepository: Repository<Delivery>,

    @Inject('DELIVERY_DETAILS_REPOSITORY')
    private deliveryDetailsRepository: Repository<DeliveryDetails>,

    @Inject('ROUTE_REPOSITORY')
    private routeRepository: Repository<Route>,
    
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
      const resp = await this.deliveryRepository.find({
        where: {...findDeliveryDto},
        relations:[
          'deliveryDetails',
          'deliveryDetails.vehicle',
          'deliveryDetails.route',
          'deliveryDetails.people',
          'deliveryDetails.product',
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

  async findOne(findDeliveryDto: FindDeliveryDto) {
    try {
      const resp = await this.deliveryRepository.findOne({
        where: {...findDeliveryDto},
        relations:[
          'deliveryDetails',
          'deliveryDetails.vehicle',
          'deliveryDetails.route',
          'deliveryDetails.people',
          'deliveryDetails.product',
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

  async createDelivery(createDeliveryDto: CreateDeliveryDto): Promise<Delivery> {
    const queryRunner = this.deliveryRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Calcular el shippingCost sumando los costos de cada DeliveryDetail considerando el descuento
      const shippingCost = createDeliveryDto.DeliveryDetails.reduce((total, detail) => {
        const cost = parseFloat(detail.cost);
        const discount = detail.discount / 100; // Convertir el descuento a decimal
        const costAfterDiscount = cost * (1 - discount); // Aplicar el descuento al costo
        return total + costAfterDiscount;
      }, 0);

      // Calcular tax y total
      const tax = shippingCost * 0.12;
      const total = shippingCost + tax;

      // Crear y guardar la entidad Delivery
      const delivery = this.deliveryRepository.create({
        ...createDeliveryDto,
        shippingCost: shippingCost.toFixed(2),
        tax: tax.toFixed(2),
        total: total.toFixed(2),
      });

      const savedDelivery = await queryRunner.manager.save(delivery);

      // Procesar DeliveryDetails y sus Routes
      for (const detailsDto of createDeliveryDto.DeliveryDetails) {
        const deliveryDetails = this.deliveryDetailsRepository.create({
          ...detailsDto,
          delivery: savedDelivery.id,  // Asignar el ID del delivery creado
        });

        const savedDetails = await queryRunner.manager.save(deliveryDetails);

        // Procesar las rutas
        for (const routeDto of detailsDto.Routes) {
          const route = this.routeRepository.create({
            ...routeDto,
            deliveryDetails: savedDetails.id,  // Asignar el ID del DeliveryDetails creado
          });

          await queryRunner.manager.save(route);
        }
      }

      // Confirmar la transacción
      await queryRunner.commitTransaction();
      return savedDelivery;
    } catch (error) {
      // Revertir la transacción en caso de error
      await queryRunner.rollbackTransaction();
      throw new HttpException(
        {
          message: error.message || 'Error creating delivery',
          codRetorno: 500,
        },
        500,
      );
    } finally {
      // Liberar el queryRunner
      await queryRunner.release();
    }
  }
}
