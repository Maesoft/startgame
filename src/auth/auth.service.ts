import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { UsersService } from 'src/users/users.service'
import * as bcryptjs from 'bcryptjs';
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService,
        private readonly jwtService: JwtService) { }

    public async createUser({ username, email, password }: CreateUserDto) {
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
        if (!userFound) throw new UnauthorizedException()
        const comparePass = await bcryptjs.compare(password, userFound.password)
        if (!comparePass) throw new UnauthorizedException()
        const payload = { sub: userFound.id, name: userFound.username, email: userFound.email }
        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }
}
