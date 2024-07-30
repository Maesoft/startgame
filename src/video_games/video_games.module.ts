import { Module } from '@nestjs/common';
import { VideoGameService } from './video_games.service';
import { VideoGamesController } from './video_games.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoGame } from './entities/video_game.entity';
import { Category } from 'src/category/entities/category.entity';
import { Company } from 'src/company/entities/company.entity';
import { Console } from 'src/console/entities/console.entity';
import Rating from 'src/raiting/entities/raiting.entity';

@Module({
  imports:[TypeOrmModule.forFeature([VideoGame,Category,Company,Console, Rating]),],
  controllers: [VideoGamesController],
  providers: [VideoGameService],
})
export class VideoGamesModule {}
