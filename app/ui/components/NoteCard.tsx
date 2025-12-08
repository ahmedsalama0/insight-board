'use client';
import { Note } from '@/app/tasks/models/types.model';
import PenIcon from '../icons/PenIcon';
import FormNoteEdit from './FormNoteEdit';
export default function NoteCard({ note }: { note: Note }) {
  return (
    <div className="overflow-x-hidden overflow-y-scroll  border border-gray-500 p-2.5 w-[150px] h-[200px] rounded hover:border-rose-500">
      {/* <PenIcon /> */}
      <FormNoteEdit note={note} />

      <div className="">{note?.content}</div>
    </div>
  );
}
