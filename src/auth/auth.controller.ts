import { Body, Controller, Delete, Post, UseGuards } from '@nestjs/common';
import { RegisterDTO } from 'src/auth/dto/register.dto';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @Post('register')
  register(@Body() registerDTO: RegisterDTO) {
    return this.authService.register(registerDTO)
  }
  @Post('login')
  login(@Body() loginDTO: LoginDTO) {
    return this.authService.login(loginDTO)
  }
  @Delete()
  @UseGuards(AuthGuard)
  delete(@Body() loginDTO: LoginDTO) {
    return this.authService.delete(loginDTO)
  }
}
