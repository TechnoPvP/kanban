import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Subtask, Task } from '@prisma/client';

@ObjectType()
export class SubtaskEntity implements Subtask {
  @Field(() => Int)
  id: number;

  @Field({ nullable: false })
  title: string;

  @Field(() => Boolean, { nullable: false })
  is_completed: boolean;

  @Field(() => Int, { nullable: false })
  task_id: number;
}

@ObjectType()
export class TaskEntity implements Task {
  @Field(() => Int)
  id: number;

  @Field(() => String, { nullable: false })
  name: string;

  @Field(() => String, { nullable: false })
  status: string;

  @Field(() => [SubtaskEntity])
  subtasks: SubtaskEntity[]

  @Field(() => Int)
  column_id: number;

  @Field()
  created_at: Date;
}
