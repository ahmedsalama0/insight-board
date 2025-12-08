export type Id = string | number;
export type Column = {
  id: Id;
  title: string;
  //status: 'todo' | 'in-progress' | 'done';
};

export type Task = {
  id: Id;
  title: string;
  columnId: Id;
  taskOrder: number;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: Status;
  createdAt: string;
  updatedAt: string;
};

export type Status = 'todo' | 'in-progress' | 'done';

export type Note = {
  id: Id;
  content: string;
};
