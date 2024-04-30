import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { VideoGame } from 'src/video_games/entities/video_game.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private readonly repositoryComments: Repository<Comment>,
    @InjectRepository(User) private readonly repositoryUser: Repository<User>,
    @InjectRepository(VideoGame) private readonly repositoryVideoGame: Repository<VideoGame>
  ) { }

  public async newComment(createCommentDto: CreateCommentDto): Promise<Comment> {

    const { comment, userId, videoGameId } = createCommentDto;

    const user = await this.repositoryUser.findOneBy({ id: userId })
    const videoGame = await this.repositoryVideoGame.findOneBy({ id: videoGameId })
    console.log(user, videoGame);
    
    if (!user || !videoGame) throw new NotFoundException("User or VideoGame not found.")

    const newComment = this.repositoryComments.create({
      comment,
      user,
      videoGame
    })

    return await this.repositoryComments.save(newComment)

  }

  public async remove(id: string) {

  }
  public async findAllCommentsByUser(userId: string) {
    const criterio: FindOneOptions = { relations: ['users'], where: { userId } }
    const userFound = await this.repositoryComments.findOne(criterio)
    if (!userFound) throw new NotFoundException
    return userFound.comment
  }
}
