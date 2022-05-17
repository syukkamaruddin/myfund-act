import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service"; 
import { UserService } from "src/user/user.service";
import { AuthResponse } from "./dto/auth-response.dto";
import { LoginDto } from "./dto/login-user.dto"; 
import { AddUserDto } from "./dto/add-user.dto";


@Injectable()
export class AuthService {

    constructor(private readonly prismaService: PrismaService, private jwtService: JwtService, private readonly usersService: UserService) { }

    async login(loginDto:LoginDto): Promise<AuthResponse> {
        const email= loginDto.email;

        const user = await this.usersService.login(loginDto);
        return {
            token: this.jwtService.sign({
                 email
            }),
            user
        }
    }

    async register(createUserDto: AddUserDto): Promise<AuthResponse> {
        const user = await this.usersService.register(createUserDto);
        const email =user.email;
        return { 
            token: this.jwtService.sign({
                email
           }),
            user
        }
    }
}