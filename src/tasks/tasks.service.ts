import { Injectable } from '@nestjs/common';
import { TASK_STATUS } from './tasks.model';
import { CreateTaskDTO } from './dtos/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  constructor(
    @InjectRepository(Task) private readonly taskRepository: TaskRepository,
  ) {}

  getById(id: string) {
    return this.taskRepository.findOne({where: {
      id
    }})
  }

  deleteTask(id: string) {
    this.tasks.filter((task) => task.id !== id);
    return null;
  }

  async getAllTasks(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  async createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
    const { title, description } = createTaskDTO;
    const newTask = {
      title,
      description,
      status: TASK_STATUS.open,
    };
    const task = await this.taskRepository.save(newTask);
    return task;
  }
}
