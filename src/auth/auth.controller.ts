import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDTO } from 'src/auth/dto/register.dto';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';

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
}
