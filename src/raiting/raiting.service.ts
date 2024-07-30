import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rating } from './entities/raiting.entity';
import { VideoGame } from 'src/video_games/entities/video_game.entity';
import { User } from 'src/users/entities/user.entity';
import { CreateRatingDto } from './dto/create-raiting.dto';
@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(Rating)
    private readonly ratingRepository: Repository<Rating>,
    @InjectRepository(VideoGame)
    private readonly videoGameRepository: Repository<VideoGame>,
  ) {}

  async create(createRatingDto: CreateRatingDto): Promise<Rating> {
    const videoGame = await this.videoGameRepository.findOne({where:{id:createRatingDto.videoGameId}});
    if (!videoGame) {
      throw new NotFoundException(`Videojuego con ID ${createRatingDto.videoGameId} no encontrado`);
    }
    
    const rating = this.ratingRepository.create(createRatingDto);
    return this.ratingRepository.save(rating);
  }

  async findByVideoGame(videoGameId: number): Promise<Rating[]> {
    const ratings = await this.ratingRepository.find({ where: { videoGame: { id: videoGameId } } });
    if (!ratings.length) {
      throw new NotFoundException(`No se encontraron calificaciones para el videojuego con ID ${videoGameId}`);
    }
    return ratings;
  }

  async getAverageRating(videoGameId: number): Promise<number> {
    const ratings = await this.findByVideoGame(videoGameId);
    if (ratings.length === 0) {
      return 0;
    }
    const total = ratings.reduce((sum, rating) => sum + rating.value, 0);
    return total / ratings.length;
  }

 //Para saber cuantas veces se dio una calificacion puntual
  async countSpecificRating(videoGameId: number, ratingValue: number): Promise<number> {
    const count = await this.ratingRepository.count({
      where: {
        videoGame: { id: videoGameId },
        value: ratingValue,
      },
    });
    return count;
  }
}