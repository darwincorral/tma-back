import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProviderDto } from './create-provider.dto';
import { IsNumber, IsString } from 'class-validator';

export class UpdateProviderDto extends PartialType(CreateProviderDto) {
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
