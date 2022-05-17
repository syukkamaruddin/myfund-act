import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ContributionController } from './contribution.controller';
import { ContributionService } from './contribution.service'; 

@Module({
    imports: [PrismaModule],
    controllers: [ContributionController],
    providers: [ContributionService]
})

export class ContributionModule {}
