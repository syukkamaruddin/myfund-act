import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { AddContributionDto, ContributionDto } from './dto/contribution.dto';
import { ContributionService } from './contribution.service'; 
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/user/decorator/get-user.decorator'; 
import {  User } from '@prisma/client'
import { ApiOkResponse, ApiUnauthorizedResponse, ApiBearerAuth, ApiForbiddenResponse, ApiNoContentResponse } from '@nestjs/swagger';

 
@UseGuards(AuthGuard('jwt'))
@Controller('contribution')
export class ContributionController {
    constructor(private readonly contributionService: ContributionService){}
     
    @Get()
    @ApiBearerAuth('jwt')
    @ApiOkResponse({description:'List of all contribution history'})
    @ApiUnauthorizedResponse({description:'Unauthorized'})
    async getAll(){
        return this.contributionService.getAll();
      
    }
 
    @Post()
    @ApiOkResponse({description:'Add new contribution'})
    @ApiUnauthorizedResponse({description:'Unauthorized'})
    @ApiBearerAuth('jwt')
    async add(
        @GetUser('') user:User,
        @Body() contribution: AddContributionDto){
        return  this.contributionService.addContribution(contribution, user.id);
      
    } 

    @Patch()
    @ApiOkResponse({description:'Modify contribution details'})
    @ApiUnauthorizedResponse({description:'Unauthorized'})
    @ApiForbiddenResponse({description:'Access to resources denied'})
    @ApiBearerAuth('jwt')
    async update(@Body() contribution: ContributionDto){
        return  this.contributionService.updateContribution(contribution);
      
    }
 

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    @ApiNoContentResponse({description:'Remove contribution record'})
    @ApiUnauthorizedResponse({description:'Unauthorized'})
    @ApiForbiddenResponse({description:'Access to resources denied'})
    @ApiBearerAuth('jwt')
    async delete( 
        @GetUser('') user:User,
        @Param('id', ParseIntPipe) id: number){  
        return  this.contributionService.deleteContribution(id, user.id);
      
    }
}
