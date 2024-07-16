import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateDeliveryDto {
  @IsString()
  @ApiProperty({
    example: 'ABCD123456',
    description: 'CODIGO DE ENTRADA',
  })
  code: string;
  @IsString()
  @ApiProperty({
    example: '2023-10-26',
    description: 'FECHA DE ENTREGA',
  })
  deliveryDate: string;
  @IsString()
  @ApiProperty({
    example: 'ABCD123456',
    description: 'CODIGO DE ENTRADA',
  })
  shippingCost: string;
  @IsString()
  @ApiProperty({
    example: '10',
    description: 'IMPUESTO',
  })
  tax: string;
  @IsString()
  @ApiProperty({
    example: '20,30',
    description: 'TOTAL',
  })
  total: string;
  @IsString()
  @ApiProperty({
    example: 'EFECTIVO',
    description: 'METODO DE PAGO',
  })
  paymentMethod: string;
  @IsString()
  @ApiProperty({
    example: 'NINGUNA OBSERVACION',
    description: 'OBSERVACION',
  })
  observation: string;
  @IsString()
  @ApiProperty({
    example: 'ACT',
    description: 'ESTADO',
  })
  status: string;

  @IsString()
  @ApiProperty({
    example: '1',
    description: 'USUARIO CREACION',
  })
  userCreated: string;
}
