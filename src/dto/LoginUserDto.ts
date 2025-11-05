import { IsEmail, IsNotEmpty } from 'class-validator';

class LoginUserDto {
  @IsEmail({}, { message: 'Invalid email format' })
  email!: string;

  @IsNotEmpty({ message: 'Password is required' })
  password!: string;
}

export default LoginUserDto;
