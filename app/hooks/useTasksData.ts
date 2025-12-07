import { Status } from './../tasks/models/types.model';
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

//UPDATE TASK
//moving a task within the same column - order changing
const updateTasksOrder = (tasks: Task[]) => {
  return axios
    .put(`${BASE_URL}/tasks/${tasks[0].id}`, {
      ...tasks[0],
      taskOrder: tasks[1].taskOrder,
    })
    .then(() => {
      return axios.put(`${BASE_URL}/tasks/${tasks[1].id}`, {
        ...tasks[1],
        taskOrder: tasks[0].taskOrder,
      });
    });
};

export const useUpdateTasksOrder = () => {
  return useMutation({
    mutationFn: (tasks: Task[]) => updateTasksOrder(tasks),
    onMutate: async (tasks, context) => {
      await context.client.cancelQueries({ queryKey: ['tasks'] });
      const previousData = context.client.getQueryData(['tasks']);
      if (previousData) {
        context.client.setQueryData(['tasks'], {
          ...previousData,
          data: [
            ...previousData?.data,
            { ...tasks[0], taskOrder: tasks[1].taskOrder },
            { ...tasks[1], taskOrder: tasks[0].taskOrder },
          ],
        });
      }
      return previousData;
    },
    onError: (err, newTask, onMutateResult, context) => {
      context.client.setQueryData(['tasks'], onMutateResult?.previousData);
    },
    // Always refetch after error or success:
    onSettled: (data, error, variables, onMutateResult, context) => {
      return context.client.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};
//UPDATE TASK (Status, columnId)
//moving a task to another column - columnId
const updateTaskStatus = (task: Task) => {
  console.log(task);
  return axios.put(`${BASE_URL}/tasks/${task.id}`, {
    ...task,
  });
};

export const useUpdateTasksStatus = () => {
  return useMutation({
    mutationFn: (task: Task) => updateTaskStatus(task),
    onMutate: async (task, context) => {
      await context.client.cancelQueries({ queryKey: ['tasks'] });
      const previousData = context.client.getQueryData(['tasks']);
      if (previousData) {
        context.client.setQueryData(['tasks'], {
          ...previousData,
          data: [...previousData?.data, task],
        });
      }
      console.log('task over a col mutation!');
      return previousData;
    },
    onError: (err, newTask, onMutateResult, context) => {
      console.log(err);
      context.client.setQueryData(['tasks'], onMutateResult?.previousData);
    },
    // Always refetch after error or success:
    onSettled: (data, error, variables, onMutateResult, context) => {
      return context.client.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

//DELETE TASK
const deleteTask = function (id: Id) {
  return axios.delete(`${BASE_URL}/tasks/${id}`);
};

export const useDeleteTask = () => {
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
      return context.client.invalidateQueries({ queryKey: ['tasks'] });
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
      return context.client.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};
