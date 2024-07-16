import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';

export class FindProductDto extends PartialType(CreateProductDto) {
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
