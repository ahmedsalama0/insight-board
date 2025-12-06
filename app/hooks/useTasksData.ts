import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Task } from '../tasks/models/types.model';
const fetchTasks = () => {
  return axios.get('http://localhost:4000/tasks');
};
export const useTasksData = () => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
  });
};

const addTask = (task: Task) => {
  return axios.post('http://localhost:4000/tasks', task);
};

export const useAddTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (task: Task) => addTask(task),
    onSuccess: (data) => {
      //query Invalidation
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};
