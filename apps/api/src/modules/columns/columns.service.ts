import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/services/database/prisma.service';
import { CreateColumnInput } from './dto/create-column.input';
import { UpdateColumnInput } from './dto/update-column.input';
import { omit } from '@kanban/utils';

@Injectable()
export class ColumnsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createColumnInput: CreateColumnInput) {
    const column = await this.prisma.column.create({ data: createColumnInput });

    return column;
  }

  async list() {
    const columns = await this.prisma.column.findMany();

    return columns;
  }

  async retrieve(id: number) {
    const columns = await this.prisma.column.findUnique({ where: { id } });

    return columns;
  }

  async update(id: number, updateColumnInput: UpdateColumnInput) {
    const column = await this.prisma.column.update({
      where: { id },
      data: { ...omit(updateColumnInput, ['id']) },
    });

    return column;
  }

  async remove(id: number) {
    const column = await this.prisma.column.delete({ where: { id } });

    return column;
  }
}
