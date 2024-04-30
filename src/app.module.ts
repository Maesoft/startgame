import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { CommentsModule } from './comments/comments.module';
import { ConsoleModule } from './console/console.module';
import { AuthModule } from './auth/auth.module';

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
AuthModule
 ],

})
export class AppModule {}
