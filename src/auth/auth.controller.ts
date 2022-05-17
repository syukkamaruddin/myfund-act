import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiConflictResponse, ApiForbiddenResponse, ApiNoContentResponse, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AddUserDto } from './dto/add-user.dto';
import { AuthResponse } from './dto/auth-response.dto';
import { LoginDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService) { } 

    @Post('/register')
    @ApiOkResponse({description:'User registration'})
    @ApiConflictResponse({description: 'Email already in use'})
    @ApiBody({type:AddUserDto})
    register(@Body() createUserDto:AddUserDto){
        return  this.authService.register(createUserDto);
    }  
    
    @Post('/login')
    @ApiOkResponse({description:'User login'})
    @ApiUnauthorizedResponse({description: 'Incorrect authentication credentials'})
    @ApiBody({type:LoginDto})
    login(@Body() loginDto:LoginDto){
        return  this.authService.login(loginDto);
    }  
}