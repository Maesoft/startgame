import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { CommentsModule } from './comments/comments.module';
import { ConsoleModule } from './console/console.module';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './company/company.module';
import { CategoryModule } from './category/category.module';
import { VideoGamesModule } from './video_games/video_games.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: "cockroachdb",
    host: "startgame-14769.7tt.aws-us-east-1.cockroachlabs.cloud",
    port: 26257,
    username: "matias_eguia",
    password: "awnWUsJGrdQTlEv6dSDB9Q",
    database: "startgame",
    ssl: true,
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
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),]
})
export class AppModule { }
