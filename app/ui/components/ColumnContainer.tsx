'use client';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { TrashIcon } from '../icons/TrashIcon';
import type { Column, Id, Task } from '../../tasks/models/types.model';
import { CSS } from '@dnd-kit/utilities';
import { useMemo, useState } from 'react';
import { PlusIcon } from '../icons/PlusIcon';
import TaskCard from './TaskCard';
// interface IProps {
//   column: Column;
// }
function ColumnContainer({
  column,
  deleteColumn,
  updateColumnTitle,
  createTask,
  updateTask,
  deleteTask,
  tasks,
}: {
  column: Column;
  deleteColumn(id: Id): void; //function declaration
  updateColumnTitle: (id: Id, title: string) => void;
  createTask: (columnId: Id) => void; //arrow fn
  updateTask(id: Id, content: string): void;
  deleteTask(id: Id): void;
  tasks: Task[];
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
  "
      ></div>
    );

  return (
    <div
      ref={setNodeRef}
      style={{ ...style, padding: '10px', border: '1px solid #000' }}
      className="

  "
    >
      {/* Column title */}
      <div
        {...attributes}
        {...listeners}
        onClick={() => {
          setEditMode(true);
        }}
        className="
      "
      >
        <div
          className="
   "
        >
          <div
            className="
        "
          >
            0
          </div>
          {!editMode && column.title}
          {editMode && (
            <input
              className=""
              value={column.title}
              onChange={(e) => updateColumnTitle(column.id, e.target.value)}
              autoFocus
              onBlur={() => setEditMode(false)}
              onKeyDown={(e) => {
                if (e.key !== 'Enter') return;
                setEditMode(false);
              }}
            />
          )}
        </div>
        <button
          onClick={() => {
            deleteColumn(column.id);
          }}
          className="
        "
        >
          <TrashIcon />
        </button>
      </div>
      {/* Column Task Container */}
      <div className="">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
        </SortableContext>
      </div>
      {/* Column Footer */}
      <div className="" style={{ width: '50px' }}>
        <button
          style={{ height: '20px', stroke: '#000' }}
          onClick={() => {
            createTask(column.id);
          }}
        >
          <PlusIcon />
          Add Task
        </button>
      </div>
    </div>
  );
}

export default ColumnContainer;
