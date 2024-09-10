import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreateRouteDto } from 'src/modules/routes/dto/create-route.dto';

export class UpdateDeliveryDetailsDto  {
  @IsNumber()
  @ApiProperty({
    example: 2,
    description: ' identificador de tabla',
  })
  id?: number;
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: '5',
    description: ' RATING QUE ACTUALIZA ',
  })
  rating: string;
  @IsString()
  @ApiProperty({
    example: 'DARWIN NARVAEZ',
    description: ' USUARIO QUE ACTUALIZA ',
  })
  userChange: string;
  @IsString()
  @ApiProperty({
    example: 'INA',
    description: 'ESTADO DE LA TABLA',
  })
  status?: string;
  @IsNumber()
  @ApiProperty({ example: 1, description: 'ID of the vehicle' })
  vehicle: number;
}
