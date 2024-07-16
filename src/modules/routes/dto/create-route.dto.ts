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
    example: 'USAURIO',
    description: 'USAURIO CREA',
  })
  userCreated: string;
}
