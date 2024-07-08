import { Module } from '@nestjs/common';
import { DataService } from './data.service';
import { DataController } from './data.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataEntity } from './entities/data.entity';  

@Module({
  imports: [TypeOrmModule.forFeature([DataEntity])],
  providers: [DataService],
  controllers: [DataController],
})
export class DataModule {}