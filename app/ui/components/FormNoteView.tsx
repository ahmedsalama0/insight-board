'use client';
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { generateId } from '@/app/tasks/page';
import PenIcon from '../icons/PenIcon';
import { Note } from '@/app/tasks/models/types.model';
import { useNotesUpdateData } from '@/app/hooks/useNotesData';
import { ViewIcon } from '../icons/ViewIcon';

export default function FormNoteView({ note }: { note: Note }) {
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

    handleClose();
  };

  return (
    <React.Fragment>
      <button
        className="stroke-[#aaa] hover:stroke-rose-600"
        onClick={handleClickOpen}
      >
        <ViewIcon />
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        sx={{
          height: '100%',
        }}
      >
        <DialogTitle>Notes</DialogTitle>
        <DialogContent>
          <DialogContentText>View note contents</DialogContentText>
          <form onSubmit={handleSubmit} id="subscription-form">
            <TextField
              margin="dense"
              id="content"
              name="content"
              label="Content"
              type="text"
              fullWidth
              variant="standard"
              sx={{ marginBottom: '10px' }}
              value={note?.content}
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {/* <Button type="submit" form="subscription-form">
            Save
          </Button> */}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
