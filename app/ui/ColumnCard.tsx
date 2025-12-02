'use client';
import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { Task } from '../tasks/models/types.model';
import { CSS } from '@dnd-kit/utilities';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import FolderIcon from '@mui/icons-material/Folder';
import TaskCard from './TaskCard';

export default function ColumnCard({
  tasks,
  title,
}: {
  tasks: Task[];
  title: string;
}) {
  const [dense, setDense] = React.useState(false);
  const [items, setItems] = React.useState(['Item 1', 'Item 2', 'Item 3']);

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

    <Grid
      size={{
        xs: 12,
        md: 6,
      }}
    >
      {/* <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
              Icon with text
            </Typography> */}
      <div>
        <SortableContext items={tasks}>
          <List dense={dense}>
            {tasks.map((task: Task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </List>
        </SortableContext>
      </div>
    </Grid>
    //     </CardContent>
    //   </CardActionArea>
    // </Card>
  );
}
