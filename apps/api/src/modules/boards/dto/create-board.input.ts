import { InputType, Int, Field } from '@nestjs/graphql';
import { Board, Prisma } from '@prisma/client';

@InputType()
export class CreateBoardInput implements Prisma.BoardCreateInput {
  @Field({ description: 'Board name' })
  name!: string;

  columns?: Prisma.ColumnCreateNestedManyWithoutBoardInput;
}
