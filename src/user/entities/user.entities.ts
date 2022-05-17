import { Exclude, Transform } from "class-transformer";
import { ContributionEntity } from "src/contribution/entities/contribution.entities";

export class UserEntity {
    
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

    id: number;
    email: string;
    name: string;
  
    @Exclude()
    hash: string;
  
  @Transform(({ value }) => value.name)
  contribution: ContributionEntity;

  }