import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, MinLength, ValidateNested } from 'class-validator';
import { CreateDeliveryDetailsDto } from 'src/modules/detalles-entregas/dto/create-detalles-entregas.dto';

export class CreateDeliveryDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'ABCD123456',
    description: 'CODIGO DE ENTRADA',
  })
  code: string;
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
    example: 'IRAMIREZ',
    description: 'USUARIO CREACION',
  })
  userCreated: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDeliveryDetailsDto)
  @ApiProperty({
    type: [CreateDeliveryDetailsDto],
    description: 'List of delivery details',
  })
  DeliveryDetails: CreateDeliveryDetailsDto[]
}
