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
import React from 'react';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';

export default function Page() {
  const [selectedCard, setSelectedCard] = React.useState(0);

  const cards = [
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
            width: '100%',
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fill, minmax(min(200px, 100%), 1fr))',
            gap: 2,
          }}
        >
          {cards.map((card, index) => (
            <Card key={card.id}>
              <CardActionArea
                onClick={() => setSelectedCard(index)}
                data-active={selectedCard === index ? '' : undefined}
                sx={{
                  height: '100%',
                  '&[data-active]': {
                    backgroundColor: 'action.selected',
                    '&:hover': {
                      backgroundColor: 'action.selectedHover',
                    },
                  },
                }}
              >
                <CardContent sx={{ height: '100%' }}>
                  <Typography variant="h5" component="div">
                    {card.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {card.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      </DndContext>
    </Container>
  );
}
