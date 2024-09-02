import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @ApiProperty({
    example: 'ANTHONY ANDRES LANDAZURI PALAN',
    description: 'NOMBRE',
  })
  name: string;
  @IsString()
  @ApiProperty({
    example: '7,50',
    description: 'PRECIO',
  })
  price: string;
  @IsNumber()
  @ApiProperty({
    example: 0,
    description: 'CANTIDAD',
  })
  quantity: number;
  @IsString()
  @ApiProperty({
    example: 'DOLAR',
    description: 'UNIDAD DE MEDIDA',
  })
  unitMeasure: string;
  @IsNumber()
  @ApiProperty({
    example: '10',
    description: 'DESCUENTO',
  })
  discount: string;
  @IsString()
  @ApiProperty({
    example: 'ALANDAZURI',
    description: 'USUARIO CREA',
  })
  userCreated: string;
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 1,
    description: 'ID DEL PROVEEDOR',
  })
  provider: number;
}
