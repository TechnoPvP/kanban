import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ColumnEntity } from '../../columns/entities/column.entity';

@ObjectType()
export class BoardEntity
  implements Prisma.BoardGetPayload<{ include: { columns: true } }>
{
  @Field(() => ID, { description: 'Board ID' })
  id: number;

  @Field({ nullable: false })
  name: string;

  @Field({ description: 'Created at date' })
  created_at: Date;

  @Field(() => [ColumnEntity])
  columns: ColumnEntity[];
}
