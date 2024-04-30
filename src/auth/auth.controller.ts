import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    createUser(@Body() userDTO: CreateUserDto) {
      return this.authService.createUser(userDTO)
    }
    @Post('login')
    iniciarSesion(@Body() loginDTO: LoginDTO) {
      return this.authService.login(loginDTO)
    }
}
