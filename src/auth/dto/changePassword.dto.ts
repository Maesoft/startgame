import { IsString } from "class-validator";

export class ChangePasswordDTO {
    @IsString()
    username:string
    @IsString()
    oldPassword: string
    @IsString()
    newPassword: string
}