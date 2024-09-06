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
import { LoggerService } from 'src/util/util.logger';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { errorResponse, successResponse } from 'src/network/responseApi';
import { Request, Response } from 'express';
import { ErrorMessage } from 'src/configuration/error-messages';
import { CreateConductorDto } from './dto/create-conductor.dto';
import { FindConductorDto } from './dto/find-conductor';
import { UpdateConductorDto } from './dto/update-conductor.dto';
import { ConductoresService } from './conductores.service';

const newLog = new LoggerService();

@ApiTags('conductores')
@Controller('drivers')
export class ConductoresController {
  constructor(private readonly conductoresService: ConductoresService) {}
  @ApiBody({ type: CreateConductorDto })
  @Post('/save')
  @ApiOperation({
    summary: 'Crea un nuevo recurso ',
    description:
      'Este endpoint permite crear un nuevo recurso de tipo createPersonasDto.',
  })
  @ApiCreatedResponse({
    description: 'Recurso creado exitosamente.',
    type: CreateConductorDto, // Sustituye YourResourceDTO por el tipo de tu DTO
  })
  async create(
    @Req() req: Request,
    @Res() res: Response,
    @Body() createConductorDto: CreateConductorDto,
  ) {
    try {
      const resp = await this.conductoresService.create(createConductorDto);

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
    // Sustituye YourResourceDTO por el tipo de tu DTO
  })
  async findAll(
    @Req() req: Request,
    @Res() res: Response,
    @Body() findConductorDto: FindConductorDto,
  ) {
    try {
      const resp = await this.conductoresService.findAll(findConductorDto);
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
    type: CreateConductorDto, // Sustituye YourResourceDTO por el tipo de tu DTO
  })
  async findOne(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') id: string,
  ) {
    try {
      const resp = await this.conductoresService.findOne(+id);
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

  @Patch(':id')
  @ApiOperation({
    summary: 'actualiza un recurso ',
    description:
      'Este endpoint permite actualziar un recurso del tipo transporte.',
  })
  @ApiCreatedResponse({
    description: 'Recurso actualzado exitosamente.',
    type: UpdateConductorDto, // Sustituye YourResourceDTO por el tipo de tu DTO
  })
  async update(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') id: string,
    @Body() updateConductorDto: UpdateConductorDto,
  ) {
    try {
      const resp = await this.conductoresService.update(
        +id,
        updateConductorDto,
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
    type: UpdateConductorDto, // Sustituye YourResourceDTO por el tipo de tu DTO
  })
  async remove(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') id: string,
    @Body() updateConductorDto: UpdateConductorDto,
  ) {
    try {
      const resp = await this.conductoresService.remove(
        +id,
        updateConductorDto,
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
