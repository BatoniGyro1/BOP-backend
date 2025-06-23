import { IsEmail, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    name:string

    @IsString()
    phoneNumber:string

    @IsString()
    @IsEmail()
    email:string

    @IsString()
    password:string;

}