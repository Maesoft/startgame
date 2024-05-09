import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
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

    if (!user || !videoGame) throw new NotFoundException("User or VideoGame not found.")

    const newComment = this.repositoryComments.create({
      comment,
      user,
      videoGame
    })
    return await this.repositoryComments.save(newComment)
  }

  public async findAllCommentsByUser(id: number) {
    const criterio: FindManyOptions = { relations: ['user','videoGame'], where: { user: { id } } }
    const comments = await this.repositoryComments.find(criterio)
    if (comments.length === 0) throw new NotFoundException(`No comments found for user with ID ${id}`)
    return comments
  }

  public async findAllCommentsByGame(id: number) {
    const criterio: FindManyOptions = { relations: ['videoGame', 'user'], where: { videoGame: { id } } }
    const comments = await this.repositoryComments.find(criterio)
    if (comments.length === 0) throw new NotFoundException(`No comments found for videogame with ID ${id}`)
    return comments
  }

  public async remove(id: number) {
    const criterio: FindOneOptions = { where: { id } }
    const commentFound = this.repositoryComments.findOneBy(criterio)
    if (!commentFound) throw new NotFoundException('')
    return this.repositoryComments.delete(criterio)
  }
}
