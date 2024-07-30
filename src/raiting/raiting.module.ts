import { Module } from '@nestjs/common';
import { RatingService } from './raiting.service';
import { RatingController } from './raiting.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Rating} from './entities/raiting.entity'
import { User } from 'src/users/entities/user.entity';
import { VideoGame } from 'src/video_games/entities/video_game.entity';
@Module({
  imports:[TypeOrmModule.forFeature([Rating, User, VideoGame])],
  controllers: [RatingController],
  providers: [RatingService],
})
export class RaitingModule {}
