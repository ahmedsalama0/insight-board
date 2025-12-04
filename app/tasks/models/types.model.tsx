export type Id = string | number;
export type Column = {
  id: Id;
  title: string;
  //status: 'todo' | 'in-progress' | 'done';
};

export type Task = {
  id: Id;
  columnId: Id;
  content: string;
  // priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'done';
  // createdAt: string;
  // updatedAt: string;
};
