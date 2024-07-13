import { Module } from '@nestjs/common';
import { ConsoleService } from './console.service';
import { ConsoleController } from './console.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Console } from './entities/console.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Console])],
  controllers: [ConsoleController],
  providers: [ConsoleService],
})
export class ConsoleModule {}
