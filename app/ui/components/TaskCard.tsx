'use client';
import { useState } from 'react';
import { TrashIcon } from '../icons/TrashIcon';
import { Id, Task } from '@/app/tasks/models/types.model';
import { CSS } from '@dnd-kit/utilities';

import { useSortable } from '@dnd-kit/sortable';

function TaskCard({
  task,
  deleteTask,
  updateTask,
}: {
  task: Task;
  deleteTask(id: Id): void;
  updateTask: (id: Id, content: string) => void;
}) {
  const [editMode, setEditMode] = useState(false);
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task,
    },
    disabled: editMode, //disable dragging and drop in the edit mode
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const [mouseIsOver, setMouseIsOver] = useState(false);

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setMouseIsOver(false); //in edit mode we're not gonna show delete icon
  };

  if (isDragging)
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="opacity-30 bg-main-700 p-2.5 h-[100px]
      min-h-[100px] items-center flex text-left rounded-xl border-2 border-rose-500
      cursor-grab relative"
      />
    );

  if (editMode)
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="
          bg-main-700 p-2.5 h-[100px]
      min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset
      hover:ring-rose-500
      cursor-grab relative
  "
      >
        <textarea
          className="
       h-[90%]
       w-full resize-none border-none rounded bg-transparent text-white focus:outline-none
       "
          value={task.description}
          autoFocus
          placeholder="Task content here"
          onBlur={toggleEditMode}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.shiftKey) toggleEditMode();
          }}
          onChange={(e) => updateTask(task.id, e.target.value)}
        ></textarea>
      </div>
    );

  return (
    <div
      ref={setNodeRef}
      style={{ ...style }}
      {...attributes}
      {...listeners}
      //onClick={toggleEditMode}
      className="
        bg-main-700 p-2.5 h-[100px]
      min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset
      hover:ring-rose-500
      cursor-grab relative task
  "
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
    >
      <p
        className="
          my-auto h-[90%] w-full overflow-y-auto
      overflow-x-hidden whitespace-pre-wrap
      "
      >
        {task.description}
      </p>
      <p>{task.id}</p>
      <p>{task.status}</p>
      <p>{task.priority}</p>
      <p>{task.taskOrder}</p>
      {mouseIsOver && (
        <button
          style={{}}
          onClick={() => {
            deleteTask(task.id);
          }}
          className="
                stroke-white absolute right-4 top-1/2 -translate-y-1/2 
      bg-column-700 p-2 rounded opacity-60 hover:opacity-100"
        >
          <TrashIcon />
        </button>
      )}
    </div>
  );
}

export default TaskCard;
