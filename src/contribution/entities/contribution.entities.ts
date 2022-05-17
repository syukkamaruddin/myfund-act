import { Decimal } from "@prisma/client/runtime";
import { Exclude, Transform } from "class-transformer";

export class ContributionEntity {
    
  constructor(partial: Partial<ContributionEntity>) {
    Object.assign(this, partial);
  } 
        id: number
        title: string
        recipient_account: string
        amaunt: Decimal
        created_dt: Date
        isActive: boolean
        userId: number
}