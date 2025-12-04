'use client';
import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { Task } from '../tasks/models/types.model';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import FolderIcon from '@mui/icons-material/Folder';

function TaskCard({ task }: { task: Task }) {
  const [mouseIsOver, setMouseIsOver] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

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
    //disabled: editMode, //disable dragging and drop in the edit mode
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
    >
      <Card
        sx={{
          marginBottom: '10%',
          backgroundColor: '#bbb',
          border: '3px solid pink',
        }}
      >
        <CardActionArea
          sx={{
            height: '80%',
          }}
        >
          <CardContent sx={{ height: '100%' }}>
            <Typography variant="h5" component="div">
              {task.title}
            </Typography>
            <ListItem>
              {/* <ListItemIcon>
        <FolderIcon />
        </ListItemIcon> */}
              <ListItemText
                primary={task.description}
                secondary={secondary ? 'Secondary text' : null}
              />
            </ListItem>
            <p>{task.status}</p>
            <p>{task.columnId}</p>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}

export default TaskCard;
