import {
  IsString,
  IsEmail,
  IsInt,
  Min,
  Max,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  sur_name: string;

  @IsString()
  first_name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  password_validation: string;

  @IsInt()
  @Min(0)
  @Max(100)
  role: number;
}
