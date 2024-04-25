import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyModule } from './company/company.module';
import { CategoryModule } from './category/category.module';
import { VideoGamesModule } from './video_games/video_games.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "startgame",
    entities: [__dirname + "/../**/*.entity.js"],
    synchronize: true,
}), CompanyModule, CategoryModule, VideoGamesModule,

 ],

})
export class AppModule {}
