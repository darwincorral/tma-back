import {Controller,Get,Post,Body,Patch,Param,Delete,Req,Res} from '@nestjs/common';
import { AuthService } from './auth.service';
import { errorResponse, successResponse } from 'src/network/responseApi';
import { Request, Response } from 'express';
import { ErrorMessage } from 'src/configuration/error-messages';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: 'Crea un nuevo recurso ',
    description:
      'Este endpoint permite iniciar sesión a usuarios.',
  })
  async login(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: any,
    ){
    try {
      const resp = await this.authService.login(body.email, body.password);
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


  @Post('login/transport')
  @ApiOperation({
    summary: 'Crea un nuevo recurso ',
    description:
      'Este endpoint permite iniciar sesión a transportistas.',
  })
  async loginTransport(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: any,
    ){
    try {
      const resp = await this.authService.loginTransport(body.email, body.password);
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
}