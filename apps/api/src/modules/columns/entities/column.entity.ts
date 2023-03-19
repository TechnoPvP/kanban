import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column } from '@prisma/client';
import { CreateColumnInput } from '../dto/create-column.input';

@ObjectType()
export class ColumnEntity implements Column {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  baord_id: number;

  @Field({ nullable: false })
  name: string;

  @Field({ nullable: true })
  color: string;

  @Field(() => Int, { nullable: true })
  order: number;

  @Field(() => Boolean, { nullable: true })
  done_column: boolean;

  @Field()
  created_at: Date;
}
