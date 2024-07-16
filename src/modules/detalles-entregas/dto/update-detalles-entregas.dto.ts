import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateDeliveryDetailsDto } from './create-detalles-entregas.dto';
import { IsNumber, IsString } from 'class-validator';

export class UpdateDeliveryDetailsDto extends PartialType(
  CreateDeliveryDetailsDto,
) {
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
