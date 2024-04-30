import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { Comment } from 'src/comments/entities/comment.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly repositoryUser: Repository<User>,
    @InjectRepository(Comment) private readonly repositoryComment: Repository<Comment>) { }

  public async createUser(createUserDto: CreateUserDto) {
    return await this.repositoryUser.save(createUserDto);
  }

  public async findByUserName(username: string) {
    return await this.repositoryUser.findOneBy({ username });
  }
}
