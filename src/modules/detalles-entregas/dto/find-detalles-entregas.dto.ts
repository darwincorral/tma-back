import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateDeliveryDetailsDto } from './create-detalles-entregas.dto';

export class FindDeliveryDetailsDto extends PartialType(
  CreateDeliveryDetailsDto,
) {
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
  @IsOptional()
  @IsNumber()
  @ApiProperty({ example: 1, description: 'ID of the vehicle' })
  vehicle: number;
}
