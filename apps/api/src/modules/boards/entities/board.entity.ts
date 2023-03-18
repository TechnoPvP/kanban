import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Board } from '@prisma/client';

@ObjectType()
export class BoardEntity implements Board {
  @Field(() => ID, { description: 'Board ID' })
  id: number;

  @Field({ nullable: false })
  name: string;

  created_at: Date;
}
