import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class userDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsEmail()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}
