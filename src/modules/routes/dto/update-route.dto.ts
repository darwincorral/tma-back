import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateRouteDto } from './create-route.dto';
import { IsNumber, IsString } from 'class-validator';

export class UpdateRouteDto extends PartialType(CreateRouteDto) {
  @IsNumber()
  @ApiProperty({
    example: 2,
    description: ' identificador de tabla',
  })
  id?: number;

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
}
