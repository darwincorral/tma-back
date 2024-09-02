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
import { ProvidersService } from './providers.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { Request, Response } from 'express';
import { LoggerService } from 'src/util/util.logger';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { errorResponse, successResponse } from 'src/network/responseApi';
import { ErrorMessage } from 'src/configuration/error-messages';
import { FindProviderDto } from './dto/find-provider.dto';

const newLog = new LoggerService();
@ApiTags('providers')
@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @ApiBody({ type: CreateProviderDto })
  @Post('/save')
  @ApiOperation({
    summary: 'Crea un nuevo recurso ',
    description:
      'Este endpoint permite crear un nuevo recurso de tipo CreateTransporteDto.',
  })
  @ApiCreatedResponse({
    description: 'Recurso creado exitosamente.',
    type: CreateProviderDto, // Sustituye YourResourceDTO por el tipo de tu DTO
  })
  async create(
    @Req() req: Request,
    @Res() res: Response,
    @Body() createProviderDto: CreateProviderDto,
  ) {
    try {
      const resp = await this.providersService.create(createProviderDto);
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
    type: FindProviderDto, // Sustituye YourResourceDTO por el tipo de tu DTO
  })
  async findAll(
    @Req() req: Request,
    @Res() res: Response,
    @Body() findProviderDto: FindProviderDto,
  ) {
    try {
      const resp = await this.providersService.findAll(findProviderDto);
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
    type: FindProviderDto, // Sustituye YourResourceDTO por el tipo de tu DTO
  })
  async findOne(
    @Req() req: Request,
    @Res() res: Response,
    @Body() findProviderDto: FindProviderDto,
  ) {
    try {
      const resp = await this.providersService.findOne(findProviderDto);
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
    type: UpdateProviderDto, // Sustituye YourResourceDTO por el tipo de tu DTO
  })
  async update(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') id: string,
    @Body() updateProviderDto: UpdateProviderDto,
  ) {
    try {
      const resp = await this.providersService.update(+id, updateProviderDto);
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
    type: UpdateProviderDto, // Sustituye YourResourceDTO por el tipo de tu DTO
  })
  async remove(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') id: string,
    @Body() updateProviderDto: UpdateProviderDto,
  ) {
    try {
      const resp = await this.providersService.remove(+id, updateProviderDto);
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
