'use client';

import { useNotesFetchData } from '@/app/hooks/useNotesData';
import NoteCard from './NoteCard';
import { Note } from '@/app/tasks/models/types.model';
import { Button } from '@mui/material';

export default function NotesPageBody() {
  const {
    isLoading,
    isError,
    data,
    refetch: notesFetchRetry,
  } = useNotesFetchData();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError)
    return (
      <div>
        <h3>Oops! an error occurred!</h3>
        <Button
          sx={{
            margin: '10px',
          }}
          onClick={() => notesFetchRetry()}
          variant="outlined"
          color="error"
        >
          Retry
        </Button>
      </div>
    );

  return (
    <div className="@container flex flex-wrap  gap-2 m-2 p-2 h-full rounded bg-[#222]">
      {data?.data.map((note: Note) => (
        <NoteCard key={note.id} content={note.content} />
      ))}
    </div>
  );
}
