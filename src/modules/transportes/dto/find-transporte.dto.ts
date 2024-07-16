import { PartialType } from '@nestjs/mapped-types';
import { CreateTransporteDto } from './create-transporte.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindTransporteDto extends PartialType(CreateTransporteDto) {
  @IsNumber()
  @IsOptional()
  @ApiProperty({
    example: 2,
    description: ' identificador de tabla',
  })
  id?: number;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'DARWIN NARVAEZ',
    description: ' USUARIO QUE ACTUALIZA ',
  })
  userChange?: string;
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'INA',
    description: 'ESTADO DE LA TABLA',
  })
  status?: string;
}
