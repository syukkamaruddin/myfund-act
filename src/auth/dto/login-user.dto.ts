import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class LoginDto {
    @IsString()
    @IsEmail()
    @ApiProperty({type:String, description:'email'})
    email: string;

    @IsString()
    @Length(3, 12)
    @ApiProperty({type:String, description:'password'})
    password: string;
}