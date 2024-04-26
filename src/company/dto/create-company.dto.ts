import { IsNumber, IsString } from "class-validator";

export class CompanyDto {
    @IsString()
    name: string;
    @IsString()
    siteUrl: string;
    @IsNumber()
    videoGameId: number
}
