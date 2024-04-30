import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { CommentsModule } from './comments/comments.module';
import { ConsoleModule } from './console/console.module';
import { AuthModule } from './auth/auth.module';
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
    entities: ["dist/**/**.entity{.ts,.js}"],
    synchronize: true
}),
UsersModule,
CommentsModule,
ConsoleModule,
AuthModule,
CompanyModule, 
CategoryModule, 
VideoGamesModule,
]})
export class AppModule {}
