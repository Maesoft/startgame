import { IsNumber, IsOptional, IsString } from "class-validator";

export class CompanyDto {
    @IsString()
    name: string;
    @IsString()
    siteUrl: string;
    @IsOptional() 
    videoGameId?: number
}
