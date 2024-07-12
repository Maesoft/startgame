import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { RegisterDTO } from 'src/auth/dto/register.dto';
import { UsersService } from 'src/users/users.service'
import * as bcryptjs from 'bcryptjs';
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService,
        private readonly jwtService: JwtService) { }

    public async register({ username, email, password }: RegisterDTO) {
        const userFound = await this.userService.findByUserName(username)
        if (userFound) throw new UnauthorizedException("Nombre de usuario existente.")
        await this.userService.createUser({
            username,
            email,
            password: await bcryptjs.hash(password, 10)
        })

        return { username, email };
    }
    public async login({ username, password }: LoginDTO) {
        const userFound = await this.userService.findByUserName(username)
        if (!userFound) throw new UnauthorizedException('Usuario y/o contraseña incorrecto.')
        const comparePass = await bcryptjs.compare(password, userFound.password)
        if (!comparePass) throw new UnauthorizedException('Usuario y/o contraseña incorrecto.')
        const payload = { id: userFound.id, name: userFound.username, email: userFound.email, rol: userFound.rol }
        return {
            token: await this.jwtService.signAsync(payload)
        }
    }
    public async delete({ username, password }: LoginDTO) {
        const userFound = await this.userService.findByUserName(username)
        if (!userFound) throw new UnauthorizedException()
        const comparePass = await bcryptjs.compare(password, userFound.password)
        if (!comparePass) throw new UnauthorizedException()
        return this.userService.deleteUser(username)
    }
}
