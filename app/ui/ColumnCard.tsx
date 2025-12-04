'use client';
import { Column, Task } from '../tasks/models/types.model';
import { CSS } from '@dnd-kit/utilities';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import * as React from 'react';
import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
import TaskCard from './TaskCard';

export default function ColumnCard({
  tasks,
  column,
}: {
  tasks: Task[];
  column: Column;
}) {
  const [dense, setDense] = React.useState(false);
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
    //disabled: editMode, //disable dragging and drop in the edit mode
  });
  const tasksIds = React.useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    // <Card>
    //   <CardActionArea
    //     sx={{
    //       height: '100%',
    //     }}
    //   >
    //     <CardContent sx={{ height: '100%' }}>
    //       <Typography variant="h5" component="div">
    //         {title}
    //       </Typography>
    <div
      ref={setNodeRef}
      style={{
        ...style,
        border: '1px solid #f7f789',
      }}
      {...attributes}
      {...listeners}
    >
      <Grid
        size={{
          xs: 12,
          md: 6,
        }}
        sx={{
          border: '5px solid #eba345',
        }}
      >
        {/* <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
              Icon with text
            </Typography> */}

        <List
          sx={{
            width: '800px',
            height: '50vh',
            margin: '20px',
            border: '1px solid red',
          }}
          dense={dense}
        >
          <SortableContext items={tasks}>
            <div
              style={{
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#333',
                borderRadius: '7px',
                border: '1px solid orange',
                height: '80vh',
                width: '50vh',
                overflowX: 'hidden',
                overflowY: 'auto',
              }}
            >
              {tasks.map((task: Task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </SortableContext>
        </List>
      </Grid>
    </div>
    //     </CardContent>
    //   </CardActionArea>
    // </Card>
  );
}
