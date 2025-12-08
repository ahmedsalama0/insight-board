'use client';

import NoteCard from './NoteCard';

export default function NotesPageBody() {
  return (
    <div className="@container flex flex-wrap  gap-2 m-2 p-2 h-full rounded bg-[#222]">
      <NoteCard content="" />
    </div>
  );
}
