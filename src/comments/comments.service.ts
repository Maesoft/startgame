import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class CommentsService {
  constructor(@InjectRepository(Comment)private readonly repositoryComments:Repository<Comment>){}

  public async newComment(createCommentDto: CreateCommentDto) {
    return await this.repositoryComments.save(createCommentDto);
  }
  public async remove(id:string){

  }
  public async findAllCommentsByUser(userId: string) {
    const criterio: FindOneOptions = { relations: ['users'], where: { userId } }
    const userFound = await this.repositoryComments.findOne(criterio)
    if (!userFound) throw new NotFoundException
    return userFound.comment
  }
}
