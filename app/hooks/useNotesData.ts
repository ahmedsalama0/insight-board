import { useQuery } from '@tanstack/react-query';
import { BASE_URL } from '../global/constants';
import axios from 'axios';
//Read notes
const fetchNotes = () => {
  return axios.get(`${BASE_URL}/notes`);
};

export const useNotesFetchData = () => {
  return useQuery({
    queryKey: ['notes'],
    queryFn: fetchNotes,
    //staleTime: 1000,
    //refetchOnWindowFocus: 'always',
    //refetchInterval: 2000,
  });
};

const createNotes = () => {};
export const useNotesCreateData = () => {};
