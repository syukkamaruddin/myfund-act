import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";  
import { GetUser } from "./decorator/get-user.decorator";
import { UserService } from "./user.service";
import {  User } from "node_modules/.prisma/client"
import { ApiBearerAuth, ApiOkResponse, ApiUnauthorizedResponse } from "@nestjs/swagger";  
@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController{
     
   constructor(private readonly userService: UserService){}
    
   @Get()
   @ApiOkResponse({description:'List of all available user'})
   @ApiUnauthorizedResponse({description:'Unauthorized'})
   @ApiBearerAuth('jwt')
   async allUser(){
       return this.userService.getAll(); 
   } 

   @Get('/contribution')
   @ApiOkResponse({description:'List of all contribution made by user'})
   @ApiUnauthorizedResponse({description:"Unauthorized"})
   @ApiBearerAuth('jwt')
   async userTransaction(
      @GetUser('') user:User,){   
         return this.userService.getAllTransaction(user.id); 
   } 
}