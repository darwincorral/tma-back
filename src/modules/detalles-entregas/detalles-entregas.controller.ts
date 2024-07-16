import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
} from '@nestjs/common';
import { CreateDeliveryDetailsDto } from './dto/create-detalles-entregas.dto';
import { UpdateDeliveryDetailsDto } from './dto/update-detalles-entregas.dto';
import { LoggerService } from 'src/util/util.logger';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { errorResponse, successResponse } from 'src/network/responseApi';
import { ErrorMessage } from 'src/configuration/error-messages';
import { Request, Response } from 'express';
import { FindDeliveryDetailsDto } from './dto/find-detalles-entregas.dto';
import { DeliveryDetailsService } from './detalles-entregas.service';

const newLog = new LoggerService();
@ApiTags('detalle-entregas')
@Controller('delivery-details')
export class DeliveryDetailsController {
  constructor(
    private readonly deliveryDetailsService: DeliveryDetailsService,
  ) {}

  @ApiBody({ type: CreateDeliveryDetailsDto })
  @Post('/save')
  @ApiOperation({
    summary: 'Crea un nuevo recurso ',
    description:
      'Este endpoint permite crear un nuevo recurso de tipo CreateTransporteDto.',
  })
  @ApiCreatedResponse({
    description: 'Recurso creado exitosamente.',
    type: CreateDeliveryDetailsDto, // Sustituye YourResourceDTO por el tipo de tu DTO
  })
  async create(
    @Req() req: Request,
    @Res() res: Response,
    @Body() createDeliveryDetailsDto: CreateDeliveryDetailsDto,
  ) {
    try {
      const resp = await this.deliveryDetailsService.create(
        createDeliveryDetailsDto,
      );
      return successResponse(req, res, 200, 1, 1, 'exito', resp);
    } catch (error) {
      newLog.error(
        `{causeError:'${
          error.options.cause
        }', descriptionError:${JSON.stringify(error.options.description)}}`,
      );
      return errorResponse(
        req,
        res,
        error.response.codRetorno || ErrorMessage.ERROR_CONTROLLER.codRetorno,
        error.status || ErrorMessage.ERROR_CONTROLLER.status,
        error.response.message || ErrorMessage.ERROR_CONTROLLER.message,
        {},
      );
    }
  }
  @Post('/findAll')
  @ApiOperation({
    summary: 'Busca un recurso ',
    description:
      'Este endpoint permite obtener un recurso del tipo transporte.',
  })
  @ApiCreatedResponse({
    description: 'Recurso encontrado exitosamente.',
    type: FindDeliveryDetailsDto, // Sustituye YourResourceDTO por el tipo de tu DTO
  })
  async findAll(
    @Req() req: Request,
    @Res() res: Response,
    @Body() findDeliveryDetailsDto: FindDeliveryDetailsDto,
  ) {
    try {
      const resp = await this.deliveryDetailsService.findAll(
        findDeliveryDetailsDto,
      );
      return successResponse(
        req,
        res,
        200,
        resp.length,
        resp.length,
        'exito',
        resp,
      );
    } catch (error) {
      return errorResponse(
        req,
        res,
        error.response.codRetorno || ErrorMessage.ERROR_CONTROLLER.codRetorno,
        error.status || ErrorMessage.ERROR_CONTROLLER.status,
        error.response.message || ErrorMessage.ERROR_CONTROLLER.message,
        {},
      );
    }
  }

  @Post('/findOne')
  @ApiOperation({
    summary: 'Busca un recurso ',
    description:
      'Este endpoint permite obtener un recurso del tipo transporte.',
  })
  @ApiCreatedResponse({
    description: 'Recurso encontrado exitosamente.',
    type: FindDeliveryDetailsDto, // Sustituye YourResourceDTO por el tipo de tu DTO
  })
  async findOne(
    @Req() req: Request,
    @Res() res: Response,
    @Body() findTransporteDto: FindDeliveryDetailsDto,
  ) {
    try {
      const resp = await this.deliveryDetailsService.findOne(findTransporteDto);
      return successResponse(req, res, 200, 1, 1, 'exito', resp);
    } catch (error) {
      return errorResponse(
        req,
        res,
        error.response.codRetorno || ErrorMessage.ERROR_CONTROLLER.codRetorno,
        error.status || ErrorMessage.ERROR_CONTROLLER.status,
        error.response.message || ErrorMessage.ERROR_CONTROLLER.message,
        {},
      );
    }
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'actualiza un recurso ',
    description:
      'Este endpoint permite actualziar un recurso del tipo transporte.',
  })
  @ApiCreatedResponse({
    description: 'Recurso actualzado exitosamente.',
    type: UpdateDeliveryDetailsDto, // Sustituye YourResourceDTO por el tipo de tu DTO
  })
  async update(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') id: string,
    @Body() updateTransporteDto: UpdateDeliveryDetailsDto,
  ) {
    try {
      const resp = await this.deliveryDetailsService.update(
        +id,
        updateTransporteDto,
      );
      return successResponse(req, res, 200, 0, 0, 'exito', resp);
    } catch (error) {
      return errorResponse(
        req,
        res,
        error.response.codRetorno || ErrorMessage.ERROR_CONTROLLER.codRetorno,
        error.status || ErrorMessage.ERROR_CONTROLLER.status,
        error.response.message || ErrorMessage.ERROR_CONTROLLER.message,
        {},
      );
    }
  }
  @Delete(':id')
  @ApiOperation({
    summary: 'elimina un recurso ',
    description:
      'Este endpoint permite eliminar un recurso del tipo transporte.',
  })
  @ApiCreatedResponse({
    description: 'Recurso eliminar exitosamente.',
    type: UpdateDeliveryDetailsDto, // Sustituye YourResourceDTO por el tipo de tu DTO
  })
  async remove(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') id: string,
    @Body() updateTransporteDto: UpdateDeliveryDetailsDto,
  ) {
    try {
      const resp = await this.deliveryDetailsService.remove(
        +id,
        updateTransporteDto,
      );
      return successResponse(req, res, 200, 0, 0, 'exito', resp);
    } catch (error) {
      return errorResponse(
        req,
        res,
        error.response.codRetorno || ErrorMessage.ERROR_CONTROLLER.codRetorno,
        error.status || ErrorMessage.ERROR_CONTROLLER.status,
        error.response.message || ErrorMessage.ERROR_CONTROLLER.message,
        {},
      );
    }
  }
}
