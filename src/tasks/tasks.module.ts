import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { customTaskRepositoryMethods } from './task.repository';
import { getDataSourceToken, getRepositoryToken } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { DataSource } from 'typeorm';

@Module({
  controllers: [TasksController],
  providers: [
    {
      provide: getRepositoryToken(Task),
      inject: [getDataSourceToken()],
      useFactory(dataSource: DataSource) {
        // Override default repository for Task with a custom one
        return dataSource
          .getRepository(Task)
          .extend(customTaskRepositoryMethods);
      },
    },
    TasksService,
  ],
})
export class TasksModule {}
