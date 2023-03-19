import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BoardsService } from './boards.service';
import { BoardEntity } from './entities/board.entity';
import { CreateBoardInput } from './dto/create-board.input';
import { UpdateBoardInput } from './dto/update-board.input';

@Resolver(() => BoardEntity)
export class BoardsResolver {
  constructor(private readonly boardsService: BoardsService) {}

  @Mutation(() => BoardEntity)
  createBoard(@Args('createBoardInput') createBoardInput: CreateBoardInput) {
    return this.boardsService.create(createBoardInput);
  }

  @Query(() => [BoardEntity], { name: 'boards' })
  list() {
    return this.boardsService.list();
  }

  @Query(() => BoardEntity, { name: 'board' })
  retrieve(@Args('id', { type: () => Int }) id: number) {
    return this.boardsService.retrieve(id);
  }

  @Mutation(() => BoardEntity)
  updateBoard(@Args('updateBoardInput') updateBoardInput: UpdateBoardInput) {
    return this.boardsService.update(updateBoardInput.id, updateBoardInput);
  }

  @Mutation(() => BoardEntity)
  removeBoard(@Args('id', { type: () => Int }) id: number) {
    return this.boardsService.remove(id);
  }
}
