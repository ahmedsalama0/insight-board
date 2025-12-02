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

function generate(element: React.ReactElement<unknown>) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: (theme.vars || theme).palette.background.paper,
}));

function TaskCard({ task }: { task: Task }) {
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
    <ListItem ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {/* <ListItemIcon>
        <FolderIcon />
      </ListItemIcon> */}
      <ListItemText
        primary={task.description}
        secondary={secondary ? 'Secondary text' : null}
      />
    </ListItem>
  );
}

export default TaskCard;
