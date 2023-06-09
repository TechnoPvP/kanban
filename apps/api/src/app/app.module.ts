import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GraphQLModule } from '@nestjs/graphql';
import { AppService } from './app.service';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { BoardsModule } from '../modules/boards/boards.module';
import { PrismaModule } from '../common/services/database/prisma.module';
import { ColumnsModule } from '../modules/columns/columns.module';
import { TasksModule } from '../modules/tasks/tasks.module';

@Module({
  imports: [
    BoardsModule,
    ColumnsModule,
    TasksModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'apps/kanban-web/schema.gql'),
      playground: true,
    }),
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
