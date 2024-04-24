import { IS_LENGTH, IsDate, IsNumber, IsString, Length } from "class-validator";

export class CreateConsoleDto {
    @IsString()
    name:string;
    @IsNumber()
    @Length(4,4)
    year:number;
}
