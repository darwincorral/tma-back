import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateTransporteDto {
  @IsString()
  @MinLength(7)
  @ApiProperty({
    example: 'PDJ1020',
    description: ' PLACA VEHICULAR ',
  })
  plate: string;
  @IsString()
  @ApiProperty({
    example: 'CHEVROLET',
    description: ' MARCA ',
  })
  brand: string;
  @IsString()
  @ApiProperty({
    example: 'SEDAN',
    description: ' TIPO DE VEHICULO ',
  })
  typeVehicle: string;
  @IsNumber()
  @ApiProperty({
    example: 4,
    description: ' CAPACIDAD EN PASAJEROS ',
  })
  capacity: number;
  @IsString()
  @ApiProperty({
    example: 'ANTHONY ANDRES LANDAZURI PALAN',
    description: ' USUARIO CREA ',
  })
  userCreated: string;
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 1,
    description: ' id_Driver ',
  })
  drivers: number;
}
