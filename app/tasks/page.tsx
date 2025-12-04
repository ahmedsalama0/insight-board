'use client';

import { useMemo, useState } from 'react';
import { PlusIcon } from '../ui/icons/PlusIcon';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { createPortal } from 'react-dom';
import { Column, Id, Task } from './models/types.model';
import TaskCard from '@/app/ui/components/TaskCard';
import ColumnContainer from '@/app/ui/components/ColumnContainer';
import { Grid } from '@mui/material';

function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>([]); //operates on addition deletion of columns.
  // Column | null //in case we are dragging a col or we don't drag anything
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const [tasks, setTasks] = useState<Task[]>([]);

  //pointer sensor, touch sensor, et cetra
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3, //300px
        //drag event starts 300px away from the original position
      },
    })
  );

  return (
    <div
      style={{ display: 'flex', gap: '20px', backgroundColor: '#999' }}
      className="border border-2 h-full"
    >
      {/* we added the sensor to activate the delete button
      since it is not working as the dndContext can't differentiate between delete click and drag click
      */}
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <SortableContext items={columnsId}>
          {columns.map((col) => (
            <ColumnContainer
              key={col.id}
              column={col}
              updateColumnTitle={updateColumnTitle}
              deleteColumn={deleteColumn}
              createTask={createTask}
              updateTask={updateTask}
              deleteTask={deleteTask}
              tasks={tasks.filter((task) => task.columnId === col.id)}
            />
          ))}
        </SortableContext>
        <button
          onClick={() => {
            createNewColumn();
          }}
          className="
            "
        >
          <PlusIcon />
          Add Column
        </button>

        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                updateColumnTitle={updateColumnTitle}
                deleteColumn={deleteColumn}
                createTask={createTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
                tasks={tasks.filter(
                  (task) => task.columnId === activeColumn.id
                )}
              />
            )}
            {activeTask && (
              <TaskCard
                task={activeTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );

  function createTask(columnId: Id): void {
    const newTask: Task = {
      id: generateId(),
      columnId,
      content: `Task ${tasks.length + 1}`,
    };

    setTasks([...tasks, newTask]);
  }

  function updateTask(id: Id, content: string) {
    const newTasks = tasks.map((task) => {
      if (task.id !== id) return task;
      return { ...task, content };
    });
    setTasks(newTasks);
  }

  function deleteTask(id: Id) {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks([...newTasks]);
  }

  function createNewColumn() {
    const columnToAdd: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };

    setColumns([...columns, columnToAdd]);
  }

  function deleteColumn(id: Id): void {
    const filteredColumns = columns.filter((col) => col.id !== id);
    //when we delete a column, we also delete tasks bounded to it.
    const newTasks = tasks.filter((t) => t.columnId !== id);
    setColumns(filteredColumns);
    setTasks(newTasks);
  }

  function updateColumnTitle(id: Id, title: string) {
    const newColumns = columns.map((col) => {
      if (col.id !== id) return col;
      return { ...col, title };
    });
    setColumns(newColumns);
  }

  function onDragStart(event: DragStartEvent) {
    console.log(`DRAG START ${event}`, event);
    if (event.active.data.current?.type === 'Column') {
      setActiveColumn(event.active.data.current.column);
    }
    if (event.active.data.current?.type === 'Task') {
      setActiveTask(event.active.data.current.task);
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
    setActiveTask(null);
    //the above 2 lines to reset (removing drag overlay components) the drag overlay when the drag over event ends

    const { active, over } = event;

    //we're not dragging over a valid element
    if (!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    //if the active element is the same as the over element (above itself) => do nothing
    // [DANGER, ERROR] //we can comment in  the next line because there is nothing is gonna change when this happen
    if (activeColumnId === overColumnId) return;

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex(
        (col) => col.id === activeColumnId
      );
      const overColumnIndex = columns.findIndex(
        (col) => col.id === overColumnId
      );
      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;

    if (!over) return; //we're not dragging over a valid element
    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAtask = active.data.current?.type === 'Task';
    const isOverATask = over.data.current?.type === 'Task';

    // if there is no active task, never execute the following block
    if (!isActiveAtask) return;

    // 2 possible scenarios
    // - dropping a task over another task or over a column
    //I'm dropping a Task over another task
    if (isActiveAtask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        //we can remove the following if check, since if they're in the same
        //column, according to the logic is not gonna change
        //if (tasks[activeIndex].columnId !== tasks[overIndex].columnId) {
        tasks[activeIndex].columnId = tasks[overIndex].columnId;
        //}

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    //I'm dropping a Task over a column
    const isOverAColumn = over.data.current?.type === 'Column';
    if (isActiveAtask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        tasks[activeIndex].columnId = overId;
        //}

        return arrayMove(tasks, activeIndex, activeIndex); //triggering a re-render of tasks because we're returning a new array
      });
    }
  }
}
function generateId() {
  // Generates a random num between 0 => 10000
  return Math.floor(Math.random() * 10001);
}

export default KanbanBoard;

//Done
