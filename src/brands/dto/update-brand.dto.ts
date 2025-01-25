// import { PartialType } from '@nestjs/mapped-types';
// import { CreateBrandDto } from './create-brand.dto';
import { IsString, MinLength } from 'class-validator';
// Extiende el dto create y vuelve sus atributos opcionales
// Aquí se pueden agregar otros
// export class UpdateBrandDto extends PartialType(CreateBrandDto) {}
export class UpdateBrandDto {
  @IsString()
  @MinLength(1)
  readonly name: string;
}
