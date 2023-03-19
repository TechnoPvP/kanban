import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/services/database/prisma.service';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTaskInput: CreateTaskInput) {
    const task = await this.prisma.task.create({ data: createTaskInput });

    return task;
  }

  async list() {
    const task = await this.prisma.task.findMany();

    return task;
  }

  async retrieve(id: number) {
    const task = await this.prisma.task.findUnique({ where: { id } });

    return task;
  }

  async update(id: number, updateTaskInput: UpdateTaskInput) {
    const task = await this.prisma.task.update({
      where: { id },
      data: updateTaskInput,
    });

    return task;
  }

  async remove(id: number) {
    const task = await this.prisma.task.delete({ where: { id } });

    return task;
  }
}
