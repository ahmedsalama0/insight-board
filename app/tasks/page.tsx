'use client';
import { DndContext, DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CssBaseline,
  Typography,
} from '@mui/material';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import React, { useState } from 'react';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import TaskCard from '../ui/TaskCard';
import ColumnCard from '../ui/ColumnCard';
import { Task } from './models/types.model';

export default function Page() {
  const tasksArr: Task[] = [
    {
      id: 1,
      title: 'Todo',
      description: 'Plants are essential for all life.',
      priority: 'low',
      status: 'todo',
      createdAt: Date.now.toString(),
      updatedAt: Date.now.toString(),
    },
    {
      id: 2,
      title: 'In-progress',
      description: 'Animals are a part of nature.',
      priority: 'medium',
      status: 'in-progress',
      createdAt: Date.now.toString(),
      updatedAt: Date.now.toString(),
    },
    {
      id: 3,
      title: 'Done',
      description: 'Humans depend on plants and animals for survival.',
      priority: 'high',
      status: 'done',
      createdAt: Date.now.toString(),
      updatedAt: Date.now.toString(),
    },
  ];

  const columnTitles = ['todo', 'in-progress', 'done'];
  const [tasks, setTasks] = React.useState<Task[]>(tasksArr);

  return (
    <Container className="">
      <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <Box
          sx={{
            marginTop: '10%',
            width: '100%',
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fill, minmax(min(200px, 100%), 1fr))',
            gap: 3,
          }}
        >
          {columnTitles.map((title) => (
            <ColumnCard
              tasks={tasks.filter((task) => task.status === title)}
              title={title}
              key={title}
            />
          ))}
        </Box>
      </DndContext>
    </Container>
  );

  function onDragStart(event: DragStartEvent) {
    console.log(event);
  }

  function onDragEnd(event: DragEndEvent) {
    console.log(event);
  }
}
