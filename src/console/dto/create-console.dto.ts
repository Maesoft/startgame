import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateConsoleDto {
    @IsString()
    @IsNotEmpty()
    name:string;
    @IsNumber()

    year:number;
}
