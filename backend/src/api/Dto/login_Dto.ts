import { IsEmail, IsString, MinLength, IsIn } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

}
