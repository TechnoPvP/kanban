import { InputType, Int, Field } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

@InputType()
export class CreateTaskInput
  implements Prisma.TaskCreateInput, Prisma.TaskUpdateInput
{
  @Field({ nullable: false })
  name: string;

  @Field({ nullable: false })
  status: string;

  @Field(() => String, { nullable: true })
  created_at?: string | Date;
}
