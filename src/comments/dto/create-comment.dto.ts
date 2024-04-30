import { IsNotEmpty, IsString, Length } from "class-validator";
import { User } from "src/users/entities/user.entity";

export class CreateCommentDto {
    @IsString()
    @IsNotEmpty()
    @Length(0,200)
    comment:string;
    @IsString()
    @IsNotEmpty()
    userId:User;
    @IsString()
    @IsNotEmpty()
    videogameId:string;
}
