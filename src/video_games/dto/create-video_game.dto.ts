import { IsString, IsNumber, IsOptional } from 'class-validator';

export class VideoGameDto {
    @IsString()
    name: string;

    @IsString()
    description: string;


    @IsString()
    images: string;

    @IsOptional() 
    categoryId: number[];

    @IsOptional() 
    companyId: number;

    @IsOptional() 
    consoleId?: number;

    @IsOptional() 
    ratingId?: number[]

}
