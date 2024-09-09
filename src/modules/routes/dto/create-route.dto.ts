import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRouteDto {
  @IsString()
  @ApiProperty({
    example: 'HORA',
    description: 'HORA',
  })
  hour: string;
  @IsString()
  @ApiProperty({ example: 'TENA ECUADOR', description: 'Location' })
  location: string;
  @IsString()
  @ApiProperty({
    example: 'LATITUD',
    description: 'LATITUD',
  })
  latitude: string;
  @IsString()
  @ApiProperty({
    example: 'LONGITUD',
    description: 'LONGITUD',
  })
  length: string;
  @IsString()
  @ApiProperty({
    example: 'INICIO',
    description: 'TIPO DE VIAJE',
  })
  type: string;
  @IsString()
  @ApiProperty({
    example: 'IRAMIREZ',
    description: 'USAURIO CREA',
  })
  userCreated: string;
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 1,
    description: 'ID DEL DETALLE ENVIO',
  })
  deliveryDetails: number;
}
