'use client';
import axios from 'axios';
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
import { Column, Id, Status, Task } from './models/types.model';
import ColumnContainer from '@/app/ui/components/ColumnContainer';
import FormDialog from '../ui/components/FormDialog';
import { BOARD_COLUMNS } from './data/data';
import { useQuery } from '@tanstack/react-query';
import {
  useAddTask,
  useDeleteTask,
  useTasksData,
  useUpdateTaskContents,
  useUpdateTasksOrder,
  useUpdateTasksStatus,
} from '../hooks/useTasksData';
import { useAuthGuard } from '../hooks/useAuthGuard';

export default function Page() {
  const authorized = useAuthGuard();

  const [columns] = useState<Column[]>(BOARD_COLUMNS); //operates on addition deletion of columns.
  // Column | null //in case we are dragging a col or we don't drag anything
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  //const [formValue, setFormValue] = useState<any>(null);

  const {
    mutate: addTask,
    isError: addTaskError,
    isPending: addTaskPending,
  } = useAddTask();

  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  //const [tasks, setTasks] = useState<Task[]>([]);

  //pointer sensor, touch sensor, et cetra
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3, //300px
        //drag event starts 300px away from the original position
      },
    })
  );
  const { mutate: mutateDelete } = useDeleteTask();

  const { isPending, isLoading, isFetching, isError, error, data, refetch } =
    useTasksData();

  const { mutate: mutateTasksOrder } = useUpdateTasksOrder();
  const { mutate: mutateTaskContent } = useUpdateTaskContents();

  const { mutate: mutateTaskStatus } = useUpdateTasksStatus();

  if (!authorized) return null;
  if (isPending || isLoading || isFetching) {
    return <h2>Loading</h2>;
  }

  if (isError)
    return (
      <>
        <div>{error.message}</div>
        <button
          onClick={() => {
            refetch();
          }}
        >
          Retry
        </button>
      </>
    );

  return (
    <div
      className="
    m-auto
    flex
    min-h-screen
    w-full
    items-center
    overflow-x-auto
    overflow-y-hidden
    px-[40px]
    "
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
        <div className="m-auto flex gap-4">
          {/* <SortableContext items={columnsId}> */}
          <div className="flex gap-4">
            {columns.map((col, i) => (
              <ColumnContainer
                key={i}
                column={col}
                // updateColumnTitle={updateColumnTitle}
                // deleteColumn={deleteColumn}
                createTask={createTask}
                updateTask={updateTask}
                deleteTask={deleteTask}
                tasks={data?.data
                  .filter((task, i, arr) => {
                    return task.columnId === col.id;
                  })
                  .sort((a, b) => a.taskOrder - b.taskOrder)}
                //setFormValue={setFormValue}
              />
            ))}
          </div>
          {/* </SortableContext> */}
        </div>
      </DndContext>
    </div>
  );

  //should be called after the form data is submitted
  function createTask(task: Task): void {
    const newTask: Task = task;
    addTask(newTask);
  }

  function updateTask(task: Task) {
    mutateTaskContent(task);
  }

  function deleteTask(id: Id) {
    console.log('delete task block');
    mutateDelete(id);
  }

  function onDragStart(event: DragStartEvent) {
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

    if (activeColumnId === overColumnId) return;
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
      const activeTask = data?.data.find((task) => task.id === activeId);
      const overTask = data?.data.find((task) => task.id === overId);
      mutateTasksOrder([activeTask, overTask]);
    }

    //I'm dropping a Task over a column
    const isOverAColumn = over.data.current?.type === 'Column';
    if (isActiveAtask && isOverAColumn) {
      const activeTask = data?.data.find((task) => task.id === activeId);

      const newTask = {
        ...activeTask,
        columnId: overId,
        status: returnColumnStatus(+overId),
      };

      mutateTaskStatus(newTask);
    }
  }
}
export function generateId() {
  // Generates a random num between 0 => 100000
  return Math.floor(Math.random() * 100001);
}

export function returnColumnStatus(columnIndex: number): Status {
  switch (columnIndex) {
    case 0:
      return 'todo';
    case 1:
      return 'in-progress';
    default:
      return 'done';
  }
}

export function returnColumnIndex(columnStatus: Status): number {
  switch (columnStatus) {
    case 'todo':
      return 0;
    case 'in-progress':
      return 1;
    default:
      return 2;
  }
}
