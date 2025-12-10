import { useMutation, useQuery } from '@tanstack/react-query';
import { BASE_URL } from '../global/constants';
import axios from 'axios';

import { createNote as generateNote } from '../utilities/helpers';
import { Note } from '../tasks/models/types.model';

const QUERY_KEY = 'notes';
const NOTES_ENDPOINT = 'notes';

//Read notes
const fetchNotes = () => {
  return axios.get(`${BASE_URL}/${NOTES_ENDPOINT}`);
};

export const useNotesFetchData = () => {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: fetchNotes,
    //staleTime: 1000,
    //refetchOnWindowFocus: 'always',
    //refetchInterval: 2000,
  });
};

//CREATE a NOTE
const createNote = () => {
  const note = generateNote();
  return axios.post(`${BASE_URL}/${NOTES_ENDPOINT}`, note);
};
export const useNotesCreateData = () => {
  return useMutation({
    mutationFn: () => {
      return createNote();
    },

    onMutate: async (newNote, context) => {
      await context.client.cancelQueries({
        queryKey: [QUERY_KEY],
      });

      const previousData = context.client.getQueryData([QUERY_KEY]);

      if (previousData) {
        context.client.setQueryData([QUERY_KEY], {
          ...previousData,
          data: [...previousData?.data, newNote],
        });
      }
    },
    onError: (_err, _newTask, onMutateResult, context) => {
      context.client.setQueryData([QUERY_KEY], onMutateResult?.previousData);
    },
    onSettled: (_data, _error, _variables, _onMutateResult, context) => {
      return context.client.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
};

const updateNote = (newNote: Note) => {
  return axios.put(`${BASE_URL}/${NOTES_ENDPOINT}/${newNote.id}`, newNote);
};

export const useNotesUpdateData = () => {
  return useMutation({
    mutationFn: (newNote: Note) => {
      return updateNote(newNote);
    },
    onMutate: async (newNote, context) => {
      await context.client.cancelQueries({
        queryKey: [QUERY_KEY],
      });
      const previousData = context.client.getQueryData([QUERY_KEY]);

      if (previousData) {
        context.client.setQueryData([QUERY_KEY], {
          ...previousData,
          data: [...previousData?.data, newNote],
        });
      }
    },
    onError: (err, _newTask, onMutateResult, context) => {
      context.client.setQueryData([QUERY_KEY], onMutateResult?.previousData);
    },
    onSettled: (_data, _error, _variables, _onMutateResult, context) => {
      return context.client.invalidateQueries({
        queryKey: [QUERY_KEY],
      });
    },
  });
};
