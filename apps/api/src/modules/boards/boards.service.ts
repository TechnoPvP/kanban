import { Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
import { PrismaService } from '../../common/services/database/prisma.service';
import { CreateBoardInput } from './dto/create-board.input';
import { UpdateBoardInput } from './dto/update-board.input';
import { BoardEntity } from './entities/board.entity';

@Injectable()
export class BoardsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBoardInput: CreateBoardInput) {
    const board = await this.prisma.board.create({
      data: { name: createBoardInput.name },
    });

    return board;
  }

  async findAll() {
    const boards = await this.prisma.board.findMany();

    return boards;
  }

  async retrieve(id: number): Promise<BoardEntity> {
    const board = await this.prisma.board.findUnique({
      where: { id },
      include: { columns: { include: { tasks: true } } },
    });

    return board;
  }

  async update(id: number, updateBoardInput: UpdateBoardInput) {
    const board = await this.prisma.board.update({
      where: { id },
      data: updateBoardInput,
    });

    return board;
  }

  remove(id: number) {
    return `This action removes a #${id} board`;
  }
}
