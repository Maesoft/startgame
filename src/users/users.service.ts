import { Injectable, NotFoundException } from '@nestjs/common';
import { RegisterDTO } from '../auth/dto/register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Comment } from 'src/comments/entities/comment.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly repositoryUser: Repository<User>,
    @InjectRepository(Comment) private readonly repositoryComment: Repository<Comment>) { }

  public async createUser(registerDTO: RegisterDTO) {
    return await this.repositoryUser.save(registerDTO);
  }

  public async findByUserName(username: string) {
    return await this.repositoryUser.findOneBy({ username });
  }

  public async deleteUser(username: string) {   
    const userFound = await this.repositoryUser.findOneBy({ username });
    if (!userFound) throw new NotFoundException('The user does not exist.');
    return await this.repositoryUser.delete(userFound.id)
  }
}