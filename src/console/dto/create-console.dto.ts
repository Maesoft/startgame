import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateConsoleDto {
    @IsString()
    @IsNotEmpty()
    name:string;
    @IsNumber()
    year:number;
    @IsOptional()
    videoGameId?: number[]
}
