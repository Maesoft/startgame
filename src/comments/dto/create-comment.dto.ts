import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator";
import { User } from "src/users/entities/user.entity";
import { VideoGame } from "src/video_games/entities/video_game.entity";

export class CreateCommentDto {

    @IsString()
    @IsNotEmpty()
    @Length(0, 200)
    comment: string;

    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @IsNumber()
    @IsNotEmpty()
    videoGameId: number;
}
