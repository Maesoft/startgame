import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCategoryDto {
    @IsString()
    name: string;
    @IsOptional() 
    videoGameId?: number[]}
