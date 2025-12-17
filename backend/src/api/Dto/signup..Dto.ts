import { IsEmail, IsString, MinLength, IsIn } from 'class-validator';

export class SignDto {
  @IsString()
  fullname: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @IsString()
  @IsIn(['user', 'admin'], { message: 'Role must be either user or admin' })
  role: string;
}
