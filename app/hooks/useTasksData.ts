import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Task } from '../tasks/models/types.model';
import { error } from 'console';

const BASE_URL = 'http://localhost:4000';

const fetchTasks = () => {
  return axios.get(`${BASE_URL}/tasks`);
};
export const useTasksData = () => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
  });
};

const addTask = (task: Task) => {
  console.log('entered axios post block');
  return axios.post(`${BASE_URL}/tasks`, task);
};

export const useAddTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (task: Task) => {
      return addTask(task);
    },
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

      // Optimistically update to the new value
      if (previousData) {
        context.client.setQueryData(['tasks'], {
          ...previousData,
          data: [...previousData?.data, newTask],
        });
      }
      console.log('flag2');

      // Return a result with the snapshotted value
      return { previousData };
    },
    // If the mutation fails,
    // use the result returned from onMutate to roll back
    onError: (err, newTask, onMutateResult, context) => {
      context.client.setQueryData(['tasks'], onMutateResult?.previousData);
    },
    // Always refetch after error or success:
    onSettled: (data, error, variables, onMutateResult, context) => {
      return context.client.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};
