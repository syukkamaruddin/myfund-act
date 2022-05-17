import { ConflictException, ForbiddenException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AddUserDto } from 'src/auth/dto/add-user.dto';
import { LoginDto } from 'src/auth/dto/login-user.dto';
import { PrismaService } from "src/prisma/prisma.service"; 

@Injectable()
export class UserService{
  constructor(private readonly prismaService: PrismaService){}

    async login(loginDto: LoginDto) {
      const email = loginDto.email;
      const password = loginDto.password;
      const user = await this.prismaService.user.findUnique({
        where: { email }
      });

    if(!user) {
        throw new UnauthorizedException('Incorrect authentication credentials');
    }
    const validatePassword = await bcrypt.compare(password, user.hash);

    if (!validatePassword) {
        throw new UnauthorizedException('Incorrect authentication credentials');
    }
    delete user.hash
    return user ;
  }

    async register(signUpDto: AddUserDto) {
          
      const email = signUpDto.email;
      const emailExists = await this.prismaService.user.findUnique({
          where: { email,},
      });
      if(!emailExists){ 
          const salt = 10;
          const hashPassword = await bcrypt.hash(signUpDto.password, salt); 
         
          const user = await this.prismaService.user.create({
              data: {
                email,
                hash: hashPassword, 
                name: signUpDto.name,
              },
            });
            
            delete user.hash
            return user;
      }
      else{
          throw new ConflictException('Email already in use');
      }
  } 

  async getAll() { 
    return await this.prismaService.user.findMany();
 }

 
 async getAllTransaction(id: number)  {
  
  return await this.prismaService.user.findMany({ 
    where:{
      id,  
    }, 
    select:{
      name:true,
      email:true,
      contributions: true,
      _count: { select: { contributions: true}},
    } 
  }) 
  
  }
}
  
