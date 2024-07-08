import { IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";

export class CreateConsoleDto {
    @IsString()
    @IsNotEmpty()
    name:string;
    @IsNumber()
    @Min(1000)
    @Max(3000)
    year:number;
}
