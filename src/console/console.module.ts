import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsoleController } from './console.controller';
import { ConsoleService } from './console.service';
import { Console } from './entities/console.entity'; 
import { VideoGame } from 'src/video_games/entities/video_game.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Console, VideoGame]), // Asegúrate de incluir todas las entidades que uses en los repositorios
  ],
  controllers: [ConsoleController],
  providers: [ConsoleService],
})
export class ConsoleModule {}