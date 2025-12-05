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

//btnTitle, action
export default function FormDialog({
  setFormValue,
}: {
  setFormValue: React.Dispatch<any>;
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
    //const email = formJson.email;
    console.log(formData);
    console.log(formJson);
    setFormValue(formJson);
    handleClose();
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Task
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill the following fields to create a task.
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
            />
            <FormInputSelect
              options={['todo', 'in-progress', 'done']}
              title="Status"
              name="status"
            />
            <FormInputSelect
              options={['low', 'medium', 'high']}
              title="Priority"
              name="priority"
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
