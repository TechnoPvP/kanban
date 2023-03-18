import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class BoardEntity implements BoardEntity {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
