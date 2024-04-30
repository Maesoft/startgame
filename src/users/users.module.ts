import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Comment } from 'src/comments/entities/comment.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User, Comment])],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
