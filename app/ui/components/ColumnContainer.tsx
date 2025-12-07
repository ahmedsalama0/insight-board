'use client';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { TrashIcon } from '../icons/TrashIcon';
import type { Column, Id, Task } from '../../tasks/models/types.model';
import { CSS } from '@dnd-kit/utilities';
import { useMemo, useState } from 'react';
import { PlusIcon } from '../icons/PlusIcon';
import TaskCard from './TaskCard';
import FormDialog from './FormDialog';
// interface IProps {
//   column: Column;
// }
function ColumnContainer({
  column,
  //deleteColumn,
  //updateColumnTitle,
  createTask,
  updateTask,
  deleteTask,
  tasks,
  setFormValue,
}: {
  column: Column;
  //deleteColumn(id: Id): void; //function declaration
  //updateColumnTitle: (id: Id, title: string) => void;
  createTask: (task: Task) => void; //arrow fn
  updateTask(id: Id, content: string): void;
  deleteTask(id: Id): void;
  tasks: Task[];
  setFormValue: React.Dispatch<any>;
}) {
  const [editMode, setEditMode] = useState(false);

  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: 'Column',
      column,
    },
    disabled: editMode, //disable dragging and drop in the edit mode
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging)
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="
         bg-column-700
    w-[350px]
    h-[500px]
    max-h-[500px]
    rounded-md
    flex
    flex-col
    opacity-40
    border-2
    border-rose-500
  "
      ></div>
    );

  return (
    <div
      ref={setNodeRef}
      style={{ ...style, padding: '10px', border: '1px solid #000' }}
      className="
        bg-column-700
    w-[350px]
    h-[500px]
    max-h-[500px]
    rounded-md
    flex
    flex-col
  "
    >
      {/* Column title */}
      <div
        {...attributes}
        {...listeners}
        onClick={() => {
          //setEditMode(true);
        }}
        className="
           bg-main-700
      text-md
      h[60px]
      cursor-grab
      rounded-md
      rounded-b-none
      p-3
      font-bold
      border-column-700
      border-4
      flex
      items-center
      justify-between
      "
      >
        <div
          className="
             flex gap-2

   "
        >
          <div
            className="
                    flex
        justify-center
        items-center
        bg-column-700
        px-2
        py-1
        text-sm
        rounded-full
        "
          >
            0
          </div>
          {!editMode && column.title}
          {/* {editMode && (
            <input
              className="
            bg-black focus:border-rose-500 border rounded outline-none px-2"
              value={column.title}
              onChange={(e) => {
                //updateColumnTitle(column.id, e.target.value)
              }}
              autoFocus
              onBlur={() => setEditMode(false)}
              onKeyDown={(e) => {
                if (e.key !== 'Enter') return;
                setEditMode(false);
              }}
            />
          )} */}
        </div>
        <button
          onClick={() => {
            //deleteColumn(column.id);
          }}
          className="
                    stroke-gray-500
          hover:stroke-white
          hover:bg-column-700
          rounded
          px-1
          py-2
        "
        >
          <TrashIcon />
        </button>
      </div>
      {/* Column Task Container */}
      <div
        className="
        flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto
      "
      >
        <p>{tasks.length}</p>
        <SortableContext items={tasksIds}>
          {tasks.map((task, _, arr) => {
            return (
              <TaskCard
                key={task.id}
                task={task}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            );
          })}
        </SortableContext>
      </div>
      {/* Column Footer */}
      <div
        className="
     
      "
      >
        {/* <button
          className="
           stroke-white flex gap-1.5 
      bg-column-700 p-2 rounded opacity-60 hover:opacity-100"
          onClick={() => {
            //createTask(column.id);
          }}
        >
          <FormDialog
            columnId={column.id}
            setFormValue={setFormValue}
            createTask={createTask}
          />
        </button> */}
        <FormDialog
          columnId={column.id}
          setFormValue={setFormValue}
          createTask={createTask}
        />
      </div>
    </div>
  );
}

export default ColumnContainer;
