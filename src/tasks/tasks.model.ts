export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
};

export const TASK_STATUS = {
  open: 'open',
  inProgress: 'in_progress',
  done: 'done',
} as const;

export type TaskStatus = (typeof TASK_STATUS)[keyof typeof TASK_STATUS];
