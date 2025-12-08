'use client';
import { PlusIcon } from '../icons/PlusIcon';

export default function NotesPageHeader() {
  return (
    <div>
      <div
        onClick={() => {
          console.log('clicked');
        }}
        className="flex gap-1.5 flex-col border-gray-500 border-1 p-2 w-[100px] m-3 ms-4 rounded items-center hover:bg-[#777] "
      >
        <button className="w-[20px] h-[20px] stroke-white ">
          <PlusIcon />
        </button>
        <span>Add Note</span>
      </div>
    </div>
  );
}
