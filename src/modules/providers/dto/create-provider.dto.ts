import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateProviderDto {
  @IsString()
  @ApiProperty({
    example: 'ANTHONY ANDRES LANDAZURI PALAN',
    description: 'NOMBRE',
  })
  name: string;
  @IsString()
  @ApiProperty({
    example: '',
    description: 'UBICACION',
  })
  location: string;
  @IsString()
  @ApiProperty({
    example: '',
    description: 'LATITUD',
  })
  latitude: string;
  @IsString()
  @ApiProperty({
    example: '',
    description: 'LONGITUD',
  })
  length: string;
  @IsString()
  @ApiProperty({
    example: '',
    description: 'TIPO',
  })
  type: string;
  @IsString()
  @ApiProperty({
    example: 'USAURIO',
    description: 'USAURIO CREA',
  })
  userCreated: string;
}
