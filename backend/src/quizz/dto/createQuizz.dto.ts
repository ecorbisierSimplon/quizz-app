import {
  IsString,
  IsInt,
  IsBoolean,
  IsDate,
  IsOptional,
  IsHexColor,
  IsRgbColor,
  IsEmpty,
  IsNotEmpty,
} from 'class-validator';
import { Unique } from 'typeorm';

export class CreateQuizzDto {
  @IsString()
  @Unique(['text'])
  text: string;

  @IsString()
  @IsOptional()
  image: string;

  @IsHexColor()
  @IsOptional()
  color: string;

  @IsInt()
  @IsOptional()
  duration: number;

  @IsBoolean()
  @IsOptional()
  visible: boolean;
}
