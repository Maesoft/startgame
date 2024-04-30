import { IsString, IsNumber } from 'class-validator';

export class VideoGameDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsNumber()
    qualification: number;
    @IsString()
    images: string;
    @IsNumber()
    categoryId: number;
    @IsNumber()
    userId: number;
    companyId: number;
}
