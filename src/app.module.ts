import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ContributionModule } from './contribution/contribution.module';

@Module({
  imports: [UserModule, AuthModule, PrismaModule, ContributionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
