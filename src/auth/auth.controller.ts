import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const token = await this.authService.validateUser(loginDto.documentNumber, loginDto.password);
    if (!token) {
      throw new UnauthorizedException('Documento o contraseña inválidos');
    }
    return { access_token: token };
  }
}
