import { IsNotEmpty, IsNumber, IsString, Length, Max, MaxLength, Min, MinLength } from "class-validator";

export class CreateConsoleDto {
    @IsString()
    @IsNotEmpty()
    name:string;
    @IsNumber()
    @Min(1000)
    @Max(3000)
    year:number;
}
