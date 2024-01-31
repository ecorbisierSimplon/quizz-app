import {
  IsString,
  IsInt,
  IsBoolean,
  IsDate,
  IsOptional,
  IsHexColor,
  IsRgbColor,
} from 'class-validator';
import { Unique } from 'typeorm';

export class CreateQuizzDto {
  @IsString()
  @Unique(['text'])
  text: string;

  @IsString()
  @IsOptional()
  image: string;

  @IsString()
  session: string;

  @IsRgbColor()
  @IsOptional()
  color: string;

  @IsInt()
  @IsOptional()
  duration: number;

  @IsBoolean()
  visible: boolean;

  @IsDate()
  @IsOptional()
  date_create: Date;
}
