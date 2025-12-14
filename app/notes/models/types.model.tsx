import { Id } from '@/app/tasks/models/types.model';

export type Note = {
  id: Id;
  title: string;
  content: string;
};
