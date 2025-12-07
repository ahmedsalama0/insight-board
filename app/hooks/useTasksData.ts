import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Id, Task } from '../tasks/models/types.model';
import { error } from 'console';

const BASE_URL = 'http://localhost:4000';

// READ TASKS
const fetchTasks = () => {
  return axios.get(`${BASE_URL}/tasks`);
};
export const useTasksData = () => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
  });
};

//DELETE TASK
const deleteTask = function (id: Id) {
  return axios.delete(`${BASE_URL}/tasks/${id}`);
};

export const useDeleteTask = () => {
  console.log('usedeletetask');
  return useMutation({
    mutationFn: (taskId: Id) => deleteTask(taskId),
    onMutate: async (taskId, context) => {
      await context.client.cancelQueries({ queryKey: ['tasks'] });
      const previousData = context.client.getQueryData(['tasks']);

      // Optimistically update to the new value
      if (previousData) {
        context.client.setQueryData(['tasks'], {
          ...previousData,
          data: [...previousData?.data.filter((task) => task.id !== taskId)],
        });
      }
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

//CREATE TASKS
const addTask = (task: Task) => {
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
