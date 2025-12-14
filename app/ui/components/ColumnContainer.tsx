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
}: //setFormValue,
{
  column: Column;
  //deleteColumn(id: Id): void; //function declaration
  //updateColumnTitle: (id: Id, title: string) => void;
  createTask: (task: Task) => void; //arrow fn
  updateTask(task: Task): void;
  deleteTask(id: Id): void;
  tasks: Task[];
  //setFormValue: React.Dispatch<any>;
}) {
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
        onClick={() => {}}
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
            {tasks.length}
          </div>
        </div>
      </div>
      {/* Column Task Container */}
      <div
        className="
        flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto
      "
      >
        {tasks.length === 0 && 'No tasks Yet!'}
        <SortableContext items={tasksIds}>
          {tasks.map((task, i, arr) => {
            return (
              <TaskCard
                key={i}
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
        <FormDialog
          columnId={column.id}
          //setFormValue={setFormValue}
          createTask={createTask}
        />
      </div>
    </div>
  );
}

export default ColumnContainer;
