import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsString, MinLength } from 'class-validator';

export class CreateConductorDto {
  @IsString()
  @ApiProperty({
    example: 'ALEXANDER GILBERT',
    description: ' NOMBRES PERSONA ',
  })
  name: string;
  @IsString()
  @ApiProperty({
    example: 'VILLAVICENCIO',
    description: ' APELLIDOS ',
  })
  lastName: string;
  @IsString()
  @ApiProperty({
    example: 'gilbert@gmail.com',
    description: ' CORREO ELECTRONICO ',
  })
  mail: string;
  @IsString()
  @ApiProperty({
    example: '1804688255',
    description: 'NUMERO DE DOCUMENTO DE IDENTIDAD',
  })
  identification: string;
  @IsString()
  @ApiProperty({
    example: '2668417',
    description: ' TELEFONO ',
  })
  phone: string;
  @IsString()
  @ApiProperty({
    example: 'QUIMIAG Y MANGLARALTO',
    description: ' direccion ',
  })
  address: string;
  @IsString()
  @ApiProperty({
    example: '123456789',
    description: ' CONTRASEÑA ',
  })
  password: string;
  @IsString()
  @ApiProperty({
    example: 'ANTHONY ANDRES LANDAZURI',
    description: 'USUARIO CREA',
  })
  userCreated: string;
}
