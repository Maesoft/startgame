import { Module } from '@nestjs/common';
import { VideoGameService } from './video_games.service';
import { VideoGamesController } from './video_games.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoGame } from './entities/video_game.entity';
import { Category } from 'src/category/entities/category.entity';
import { Company } from 'src/company/entities/company.entity';

@Module({
  imports:[TypeOrmModule.forFeature([VideoGame,Category,Company]),],
  controllers: [VideoGamesController],
  providers: [VideoGameService],
})
export class VideoGamesModule {}
