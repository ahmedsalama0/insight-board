import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Task } from '../tasks/models/types.model';
import { error } from 'console';
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
  //const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (task: Task) => addTask(task),
    // onSuccess: (data) => {
    //   //query Invalidation
    //   queryClient.invalidateQueries({ queryKey: ['tasks'] });
    // },
    onMutate: async (newTask, context) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await context.client.cancelQueries({ queryKey: ['tasks'] });
      // Snapshot the previous value
      const previousData = context.client.getQueryData(['tasks']);
      console.log('flag1');
      // Optimistically update to the new value
      context.client.setQueryData(['tasks'], (old: []) => [...old, newTask]);
      console.log('flag2');

      // Return a result with the snapshotted value
      return { previousData };
    },
    // If the mutation fails,
    // use the result returned from onMutate to roll back
    onError: (err, newTask, onMutateResult, context) => {
      console.log(err);
      console.log(newTask);
      context.client.setQueryData(['tasks'], onMutateResult?.previousData);
    },
    // Always refetch after error or success:
    onSettled: (data, error, variables, onMutateResult, context) => {
      console.log(data);
      console.log(error);
      return context.client.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};
