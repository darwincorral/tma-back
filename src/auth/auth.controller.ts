import {Controller,Get,Post,Body,Patch,Param,Delete,Req,Res} from '@nestjs/common';
import { AuthService } from './auth.service';
import { errorResponse, successResponse } from 'src/network/responseApi';
import { Request, Response } from 'express';
import { ErrorMessage } from 'src/configuration/error-messages';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  
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
}