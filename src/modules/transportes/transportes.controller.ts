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
import { TransportesService } from './transportes.service';
import { CreateTransporteDto } from './dto/create-transporte.dto';
import { UpdateTransporteDto } from './dto/update-transporte.dto';
import { LoggerService } from 'src/util/util.logger';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { errorResponse, successResponse } from 'src/network/responseApi';
import { Request, Response } from 'express';
import { ErrorMessage } from 'src/configuration/error-messages';
import { FindTransporteDto } from './dto/find-transporte.dto';

const newLog = new LoggerService();

@ApiTags('vehiculo')
@Controller('vehicle')
export class TransportesController {
  constructor(private readonly transportesService: TransportesService) {}
  @ApiBody({ type: CreateTransporteDto })
  @Post('/save')
  @ApiOperation({
    summary: 'Crea un nuevo recurso ',
    description:
      'Este endpoint permite crear un nuevo recurso de tipo CreateTransporteDto.',
  })
  @ApiCreatedResponse({
    description: 'Recurso creado exitosamente.',
    type: CreateTransporteDto, // Sustituye YourResourceDTO por el tipo de tu DTO
  })
  async create(
    @Req() req: Request,
    @Res() res: Response,
    @Body() createTransporteDto: CreateTransporteDto,
  ) {
    try {
      const resp = await this.transportesService.create(createTransporteDto);

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
    type: FindTransporteDto, // Sustituye YourResourceDTO por el tipo de tu DTO
  })
  async findAll(
    @Req() req: Request,
    @Res() res: Response,
    @Body() findTransporteDto: FindTransporteDto,
  ) {
    try {
      const resp = await this.transportesService.findAll(findTransporteDto);
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

  @Get('/findOne/:id')
  @ApiOperation({
    summary: 'Busca un recurso ',
    description:
      'Este endpoint permite obtener un recurso del tipo transporte.',
  })
  @ApiCreatedResponse({
    description: 'Recurso encontrado exitosamente.',
    type: FindTransporteDto, // Sustituye YourResourceDTO por el tipo de tu DTO
  })
  async findOne(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') id: string,
  ) {
    try {
      const resp = await this.transportesService.findOne(+id);
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
    type: UpdateTransporteDto, // Sustituye YourResourceDTO por el tipo de tu DTO
  })
  async update(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') id: string,
    @Body() updateTransporteDto: UpdateTransporteDto,
  ) {
    try {
      const resp = await this.transportesService.update(
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
  @Delete(':id/:user')
  @ApiOperation({
    summary: 'elimina un recurso ',
    description:
      'Este endpoint permite eliminar un recurso del tipo transporte.',
  })
  @ApiCreatedResponse({
    description: 'Recurso eliminar exitosamente.',
    type: UpdateTransporteDto, // Sustituye YourResourceDTO por el tipo de tu DTO
  })
  async remove(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') id: string,
    @Param('user') user: string,
  ) {
    try {
      const resp = await this.transportesService.remove(
        +id,
        user,
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
