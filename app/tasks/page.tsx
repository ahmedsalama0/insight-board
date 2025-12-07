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
import { useAddTask, useTasksData } from '../hooks/useTasksData';

export default function Page() {
  const [columns, setColumns] = useState<Column[]>(BOARD_COLUMNS); //operates on addition deletion of columns.
  // Column | null //in case we are dragging a col or we don't drag anything
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [dialogOpened, setDialogOpened] = useState<boolean>(false);
  const [formValue, setFormValue] = useState<any>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const {
    mutate: addTask,
    isError: addTaskError,
    isPending: addTaskPending,
  } = useAddTask();

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

  const { isPending, isLoading, isFetching, isError, error, data, refetch } =
    useTasksData();
  if (isPending || isLoading || isFetching) {
    return <h2>Loading</h2>;
  }

  if (isError) return <div>{error.message}</div>;

  // return (
  //   <ul>
  //     {data.data?.map((todo) => (
  //       <li key={todo.id}>{todo.title}</li>
  //     ))}
  //   </ul>
  // );

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
      <button
        onClick={() => {
          console.log('clicked');
          refetch();
        }}
      >
        Retry
      </button>

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
          {/* { <SortableContext items={columnsId}>} */}
          <div className="flex gap-4">
            {columns.map((col) => (
              <ColumnContainer
                key={col.id}
                column={col}
                // updateColumnTitle={updateColumnTitle}
                // deleteColumn={deleteColumn}
                createTask={createTask}
                updateTask={updateTask}
                deleteTask={deleteTask}
                tasks={data?.data
                  .filter((task, i, arr) => {
                    console.log(task.columnId, ' ', col.id);
                    return task.columnId === col.id;
                  })
                  .sort((a, b) => a.taskOrder - b.taskOrder)}
                setFormValue={setFormValue}
              />
            ))}
          </div>
          {/* {   </SortableContext>} */}
        </div>
      </DndContext>
    </div>
  );

  //should be called after the form data is submitted
  function createTask(task: Task): void {
    // const newTask: Task = {
    //   id: generateId(),
    //   columnId,
    //   description: `Task ${tasks.length + 1}`,
    //   status: returnColumnStatus(+columnId),
    //   createdAt: Date.now().toString(),
    //   updatedAt: '',
    //   priority: 'high',
    // };
    const newTask: Task = task;
    addTask(newTask);
    console.log(newTask);
    //setTasks([...tasks, newTask]);
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

  // function createNewColumn() {
  //   const columnsLength = columnsId.length;
  //   const columnToAdd: Column = {
  //     id: columnsLength < 3 ? columnsLength : generateId(),
  //     title: `Column ${columns.length + 1}`,
  //   };

  //   setColumns([...columns, columnToAdd]);
  // }

  // function deleteColumn(id: Id): void {
  //   const filteredColumns = columns.filter((col) => col.id !== id);
  //   //when we delete a column, we also delete tasks bounded to it.
  //   const newTasks = tasks.filter((t) => t.columnId !== id);
  //   setColumns(filteredColumns);
  //   setTasks(newTasks);
  // }

  // function updateColumnTitle(id: Id, title: string) {
  //   const newColumns = columns.map((col) => {
  //     if (col.id !== id) return col;
  //     return { ...col, title };
  //   });
  //   setColumns(newColumns);
  // }

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

        const overColumnIndex = columns.findIndex((col) => col.id === overId);

        tasks[activeIndex].status = returnColumnStatus(overColumnIndex);
        console.log('BREAKPOINT:');
        console.log(overColumnIndex);
        console.log(tasks[activeIndex].columnId);
        console.log(returnColumnStatus(overColumnIndex));
        return arrayMove(tasks, activeIndex, activeIndex); //triggering a re-render of tasks because we're returning a new array
      });
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
    //case 2:
    //  return 'done';
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
    //case 2:
    //  return 'done';
    default:
      return 2;
  }
}

//Done
