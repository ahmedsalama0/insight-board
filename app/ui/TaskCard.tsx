'use client';
import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { Task } from '../tasks/models/types.model';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';

function TaskCard({ task }: { task: Task }) {
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
    <Card ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <CardActionArea
        sx={{
          height: '100%',
        }}
      >
        <CardContent sx={{ height: '100%' }}>
          <Typography variant="h5" component="div">
            {task.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {task.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default TaskCard;
