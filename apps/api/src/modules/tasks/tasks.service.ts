import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/services/database/prisma.service';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { SubtaskEntity, TaskEntity } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTaskInput: CreateTaskInput): Promise<TaskEntity> {
    const task = await this.prisma.task.create({
      data: createTaskInput,
      include: { subtasks: true },
    });

    return task;
  }

  async list(): Promise<TaskEntity[]> {
    const task = await this.prisma.task.findMany({
      include: { subtasks: true },
    });

    return task;
  }

  async retrieve(id: number): Promise<TaskEntity> {
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: { subtasks: true },
    });

    return task;
  }

  async update(
    id: number,
    updateTaskInput: UpdateTaskInput
  ): Promise<TaskEntity> {
    const task = await this.prisma.task.update({
      where: { id },
      data: updateTaskInput,
      include: { subtasks: true },
    });

    return task;
  }

  async remove(id: number) {
    const task = await this.prisma.task.delete({ where: { id } });

    return task;
  }
}
