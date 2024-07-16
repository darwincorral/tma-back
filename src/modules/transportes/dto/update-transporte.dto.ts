import { PartialType } from '@nestjs/mapped-types';
import { CreateTransporteDto } from './create-transporte.dto';
import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTransporteDto extends PartialType(CreateTransporteDto) {
  @IsNumber()
  @ApiProperty({
    example: 2,
    description: ' identificador de tabla',
  })
  id?: number;

  @IsString()
  @ApiProperty({
    example: 'DARWIN NARVAEZ',
    description: ' USUARIO QUE ACTUALIZA ',
  })
  userChange: string;
  @IsString()
  @ApiProperty({
    example: 'INA',
    description: 'ESTADO DE LA TABLA',
  })
  status?: string;
}
