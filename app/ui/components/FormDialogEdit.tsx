'use client';
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormInputSelect from './FormInputSelect';
import { Margin } from '@mui/icons-material';
import { Id, Task } from '@/app/tasks/models/types.model';
import {
  generateId,
  returnColumnIndex,
  returnColumnStatus,
} from '@/app/tasks/page';
import PenIcon from '../icons/PenIcon';

//btnTitle, action
export default function FormDialogEdit({
  task,
  updateTask,
}: {
  task: Task;
  updateTask(task: Task): void;
}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    // setFormValue(formJson);
    const editedTask = {
      id: task.id,
      title: formJson?.title,
      createdAt: task.createdAt,
      updatedAt: performance.now().toString(),
      description: formJson?.description,
      priority: formJson?.priority,
      status: formJson?.status,
      columnId: returnColumnIndex(formJson?.status),
      taskOrder: task.taskOrder,
    };
    console.log(editedTask);
    updateTask(editedTask);
    handleClose();
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        <PenIcon />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill the following fields to Edit a task.
          </DialogContentText>
          <form onSubmit={handleSubmit} id="subscription-form">
            <TextField
              autoFocus
              required
              margin="dense"
              id="title"
              name="title"
              label="title"
              type="text"
              fullWidth
              variant="standard"
              sx={{ marginBottom: '10px' }}
              defaultValue={task.title}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="description"
              name="description"
              label="description"
              type="text"
              fullWidth
              variant="standard"
              sx={{ marginBottom: '10px' }}
              defaultValue={task.description}
            />
            <FormInputSelect
              options={['todo', 'in-progress', 'done']}
              title="Status"
              name="status"
              value={task.status}
            />
            <FormInputSelect
              options={['low', 'medium', 'high']}
              title="Priority"
              name="priority"
              value={task.priority}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form="subscription-form">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
