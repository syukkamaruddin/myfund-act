import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class AddUserDto {
    @IsEmail() 
    @ApiProperty({type:String, description:'email'})
    email: string;

    @IsString()
    @Length(3, 12)
    @ApiProperty({type:String, description:'passworrd'})
    password: string;

    @IsString()
    @Length(2, 150)
    @ApiProperty({type:String, description:'name'})
    name: string; 
}