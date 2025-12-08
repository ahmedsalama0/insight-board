'use client';
import PenIcon from '../icons/PenIcon';
export default function NoteCard({ content }: { content: string }) {
  return (
    <div className="overflow-x-hidden overflow-y-scroll  border border-gray-500 p-2.5 w-[150px] h-[200px] rounded hover:border-rose-500">
      <button className="stroke-[#aaa] hover:stroke-rose-600">
        <PenIcon />
      </button>

      <div className="">{content}</div>
    </div>
  );
}
