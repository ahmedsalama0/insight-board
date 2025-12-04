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

  if (isDragging) return <div ref={setNodeRef} style={style} className="" />;

  if (editMode)
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="
  "
      >
        <textarea
          className="
       "
          value={task.content}
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
      onClick={toggleEditMode}
      className="
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
      "
      >
        {task.content}
      </p>
      {mouseIsOver && (
        <button
          style={{}}
          onClick={() => {
            deleteTask(task.id);
          }}
          className=""
        >
          <TrashIcon />
        </button>
      )}
    </div>
  );
}

export default TaskCard;
