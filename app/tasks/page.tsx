'use client';
import { DndContext } from '@dnd-kit/core';
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

export default function Page() {
  const tasks = [
    {
      id: 1,
      title: 'Todo',
      description: 'Plants are essential for all life.',
    },
    {
      id: 2,
      title: 'In-progress',
      description: 'Animals are a part of nature.',
    },
    {
      id: 3,
      title: 'Done',
      description: 'Humans depend on plants and animals for survival.',
    },
  ];

  return (
    <Container className="">
      <CssBaseline />
      <DndContext>
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
          <SortableContext items={[1, 2, 3]}>
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </SortableContext>
        </Box>
      </DndContext>
    </Container>
  );
}
