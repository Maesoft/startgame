import { Injectable, NotFoundException } from '@nestjs/common';
import { RegisterDTO } from '../auth/dto/register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FindOneOptions, Repository } from 'typeorm';
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
}
