import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateDeliveryDetailsDto {
  @IsString()
  @ApiProperty({
    example: '1',
    description: 'cantidad',
  })
  quantity: string;
  @IsString()
  @ApiProperty({
    example: '7,50',
    description: 'precio',
  })
  cost: string;
  @IsNumber()
  @ApiProperty({
    example: '10',
    description: 'descuento',
  })
  discount: number;
  @IsNumber()
  @ApiProperty({
    example: '10:40:35',
    description: 'hora de inicio',
  })
  startTime: string;
  @IsNumber()
  @ApiProperty({
    example: '11:40:35',
    description: 'hora de finalizacion',
  })
  endTime: string;
  @IsNumber()
  @ApiProperty({
    example: 'ubicacion',
    description: 'ubicacion',
  })
  location: string;
  @IsNumber()
  @ApiProperty({
    example: '23° 26′ 14.440',
    description: 'latitud',
  })
  latitude: string;
  @IsNumber()
  @ApiProperty({
    example: '38° 53 35 N, 77° 00 32 W',
    description: 'longitud',
  })
  length: string;
  @IsNumber()
  @ApiProperty({
    example: '1',
    description: 'calificacion',
  })
  rating: string;
}
