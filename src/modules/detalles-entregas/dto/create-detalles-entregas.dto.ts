import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';
import { CreateRouteDto } from 'src/modules/routes/dto/create-route.dto';

export class CreateDeliveryDetailsDto {
  @IsNumber()
  @ApiProperty({ example: 1, description: 'ID of the product' })
  product: number;
  @IsNumber()
  @ApiProperty({ example: 1, description: 'ID of the person' })
  people: number;
  @IsString()
  @ApiProperty({
    example: '1',
    description: 'cantidad',
  })
  quantity: string;
  @IsString()
  @ApiProperty({
    example: '7.50',
    description: 'precio',
  })
  cost: string;
  @IsNumber()
  @ApiProperty({
    example: '10',
    description: 'descuento',
  })
  discount: number;
  @IsString()
  @ApiProperty({
    example: '1',
    description: 'calificacion',
  })
  rating: string;
  @IsString()
  @ApiProperty({
    example: 'IRAMIREZ',
    description: 'USUARIO CREACION',
  })
  userCreated: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRouteDto)
  @ApiProperty({
    type: [CreateRouteDto],
    description: 'List of routes',
  })
  Routes: CreateRouteDto[];
}
