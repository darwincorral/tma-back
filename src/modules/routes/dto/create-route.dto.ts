import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

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
}
