import { ApiProperty } from "@nestjs/swagger";
import { Decimal } from "@prisma/client/runtime";
import { IsBoolean, isBoolean, IsDefined, IsNotEmpty, isNumber, IsNumber, IsString } from "class-validator"; 

export class ContributionDto { 
  @IsNotEmpty()
  @ApiProperty({type:Number, description:'contribution id'})
  id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({type:String, description:'title'})
  title: string;
  
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type:String, description:'recipient account number'})
    recipient_acct: string;
  
    
    @IsNotEmpty()
    @ApiProperty({type:Number, description:'amount'})
    amount: Number; 
  }

  
export class AddContributionDto {  
  @IsString()
  @IsNotEmpty()
  @ApiProperty({type:String, description:'title'})
  title: string;
  
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type:String, description:'recipient account number'})
    recipient_acct: string;
  
    
    @IsNotEmpty()
    @ApiProperty({type:Number, description:'amount'})
    amount: Number; 
  }