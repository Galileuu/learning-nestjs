import { Repository } from 'typeorm';
import { Task } from './task.entity';

export interface TaskRepository extends Repository<Task> {
  this: Repository<Task>;

  findDone(): Promise<Task[]>;

  findPending(): Promise<Task[]>;
}

export const customTaskRepositoryMethods: Pick<
  TaskRepository,
  'findDone' | 'findPending'
> = {
  findDone(this: Repository<Task>) {
    return this.findBy({ status: "done"});
  },
  findPending(this: Repository<Task>) {
    return this.findBy({ status: "in_progress"});
  },
};
