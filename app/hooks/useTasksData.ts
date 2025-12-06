import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
const fetchTasks = () => {
  return axios.get('http://localhost:4000/tasks');
};
export const useTasksData = () => {
  return useQuery({
    queryKey: ['Tasks'],
    queryFn: fetchTasks,
  });
};

//const addTask()
