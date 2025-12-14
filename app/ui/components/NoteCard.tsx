'use client';
import { Note } from '@/app/tasks/models/types.model';
import PenIcon from '../icons/PenIcon';
import FormNoteEdit from './FormNoteEdit';
import FormNoteView from './FormNoteView';
import { Card, Typography } from '@mui/material';
export default function NoteCard({ note }: { note: Note }) {
  return (
    // <Card>
    <div className="overflow-x-hidden overflow-y-scroll  border border-gray-500 p-2.5 w-[150px] h-[200px] rounded hover:border-rose-500">
      <div className="flex gap-1 items-center mb-1">
        <FormNoteView note={note} />
        <FormNoteEdit note={note} />
      </div>
      <Typography className="">{note?.title}</Typography>
    </div>
    //</Card>
  );
}
