import { InputType, Int, Field } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

@InputType()
export class CreateColumnInput
  implements Prisma.ColumnUpdateInput, Prisma.ColumnCreateInput
{
  @Field(() => String, { nullable: false })
  name: string;

  @Field(() => String, { nullable: true })
  color: string;

  @Field(() => Int, { nullable: true })
  order: number;

  @Field(() => Boolean, { nullable: true })
  done_column?: boolean;

  created_at?: string | Date;

  tasks?: Prisma.TaskCreateNestedManyWithoutColumnInput;

  board?: Prisma.BoardCreateNestedOneWithoutColumnsInput;
}
