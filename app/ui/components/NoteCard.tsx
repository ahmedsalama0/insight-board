'use client';
import PenIcon from '../icons/PenIcon';
export default function NoteCard({ content }: { content: string }) {
  if (content.trim() === '') {
    content = 'untitled';
  }
  return (
    <div className="overflow-x-hidden overflow-y-scroll  border border-gray-500 p-2.5 w-[150px] h-[200px] rounded">
      <button>
        <PenIcon />
      </button>

      <div className="">{content}</div>
    </div>
  );
}
