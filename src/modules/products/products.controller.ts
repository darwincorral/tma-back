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
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
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
import { FindProductDto } from './dto/find-product.dto';
const newLog = new LoggerService();

@ApiTags('productos')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiBody({ type: CreateProductDto })
  @Post('/save')
  @ApiOperation({
    summary: 'Crea un nuevo recurso ',
    description:
      'Este endpoint permite crear un nuevo recurso de tipo CreateTransporteDto.',
  })
  @ApiCreatedResponse({
    description: 'Recurso creado exitosamente.',
    type: CreateProductDto, // Sustituye YourResourceDTO por el tipo de tu DTO
  })
  async create(
    @Req() req: Request,
    @Res() res: Response,
    @Body() createProductDto: CreateProductDto,
  ) {
    try {
      const resp = await this.productsService.create(createProductDto);
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
    type: FindProductDto, // Sustituye YourResourceDTO por el tipo de tu DTO
  })
  async findAll(
    @Req() req: Request,
    @Res() res: Response,
    @Body() findProductDto: FindProductDto,
  ) {
    try {
      const resp = await this.productsService.findAll(findProductDto);
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
    type: FindProductDto, // Sustituye YourResourceDTO por el tipo de tu DTO
  })
  async findOne(
    @Req() req: Request,
    @Res() res: Response,
    @Body() findProductDto: FindProductDto,
  ) {
    try {
      const resp = await this.productsService.findOne(findProductDto);
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
    type: UpdateProductDto, // Sustituye YourResourceDTO por el tipo de tu DTO
  })
  async update(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    try {
      const resp = await this.productsService.update(+id, updateProductDto);
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
  @Put(':id')
  @ApiOperation({
    summary: 'elimina un recurso ',
    description:
      'Este endpoint permite eliminar un recurso del tipo transporte.',
  })
  @ApiCreatedResponse({
    description: 'Recurso eliminar exitosamente.',
    type: UpdateProductDto, // Sustituye YourResourceDTO por el tipo de tu DTO
  })
  async remove(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    try {
      const resp = await this.productsService.remove(+id, updateProductDto);
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
