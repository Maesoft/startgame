import { IsString, Length } from "class-validator";

export class CreateCommentDto {
    @IsString()
    @Length(0,200)
    comment:string;
    @IsString()
    userId:string;
    @IsString()
    videogameId:string;
}
