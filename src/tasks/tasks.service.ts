import { Injectable } from '@nestjs/common';
import { TASK_STATUS, Task } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDTO } from './dtos/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getById(id: string) {
    return this.tasks.find((task) => task.id === id);
  }

  deleteTask(id: string) {
    this.tasks.filter((task) => task.id !== id);
    return null
  }

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(createTaskDTO: CreateTaskDTO): Task {
    const { title, description } = createTaskDTO;
    const task: Task = {
      title,
      description,
      id: uuid(),
      status: TASK_STATUS.open,
    };
    this.tasks.push(task);
    return task;
  }
}
