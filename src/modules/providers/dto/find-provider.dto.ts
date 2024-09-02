import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProviderDto } from './create-provider.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class FindProviderDto extends PartialType(CreateProviderDto) {
  @IsNumber()
  @IsOptional()
  @ApiProperty({
    example: 2,
    description: ' identificador de tabla',
  })
  id?: number;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'DARWIN NARVAEZ',
    description: ' USUARIO QUE ACTUALIZA ',
  })
  userChange?: string;
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'INA',
    description: 'ESTADO DE LA TABLA',
  })
  status?: string;
}
