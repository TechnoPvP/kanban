import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Task } from '@prisma/client';

@ObjectType()
export class TaskEntity implements Task {
  @Field(() => Int)
  id: number;

  @Field(() => String, { nullable: false })
  name: string;

  @Field(() => String, { nullable: false })
  status: string;

  @Field(() => Int)
  column_id: number;

  @Field()
  created_at: Date;
}
