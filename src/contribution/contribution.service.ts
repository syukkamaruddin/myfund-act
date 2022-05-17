import { Body, ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service'; 
import { AddContributionDto, ContributionDto } from './dto/contribution.dto';

@Injectable()
export class ContributionService {
    constructor(private readonly prismaService: PrismaService){}
    async getAll() {
        return await this.prismaService.contribution.findMany();
    }
    
    async addContribution(addContribution: AddContributionDto, userId:number) {

        const account_exists =
        await this.prismaService.contribution.findUnique({
          where: {
            title:addContribution.title,
          },
        });

        if(account_exists){
            throw new ConflictException
        }
        const contribution = await this.prismaService.contribution.create({
            data: { 
                title: addContribution.title,
                amaunt: parseInt(addContribution.amount.toString()), 
                recipient_account: addContribution.recipient_acct,
                userId:userId
            },
          });
          
          return contribution; 
    }

    
    async updateContribution(contribution: ContributionDto) {
        const cntribute = await this.prismaService.contribution.findUnique({
            where: {
                id: contribution.id
            },
            });
        
            if(!cntribute){
                throw new ForbiddenException(
                    'Access to resources denied',
                  );
            } 
            return this.prismaService.contribution.update({
                where:{
                    id:cntribute.id
                },
                data:{
                   amaunt:  parseInt(contribution.amount.toString()), 
                   recipient_account:contribution.recipient_acct
                }
            })
    }

    
    async deleteContribution(contributionId: number, userid:number) {
       
        const infaq = await this.prismaService.contribution.findUnique({
            where: {
                id: contributionId
            },
            });
        
            if(infaq.userId !== userid){
                throw new ForbiddenException(
                    'Access to resources denied',
                  );
            }

            return this.prismaService.contribution.delete({
                where:{
                    id:infaq.id
                }
            })
    }
}
