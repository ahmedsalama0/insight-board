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

export default function FormNoteEdit({ note }: { note: Note }) {
  const {
    data,
    isError,
    mutate: updateNoteContentMutate,
  } = useNotesUpdateData();

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

    const newNote = {
      id: note.id,
      content: formJson?.content,
    };

    updateNoteContentMutate(newNote);

    handleClose();
  };

  return (
    <React.Fragment>
      <button
        className="stroke-[#aaa] hover:stroke-rose-600"
        onClick={handleClickOpen}
      >
        <PenIcon />
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        sx={{
          height: '100%',
        }}
      >
        <DialogTitle>Note Editor</DialogTitle>
        <DialogContent>
          <DialogContentText>Edit note contents</DialogContentText>
          <form onSubmit={handleSubmit} id="subscription-form">
            <TextField
              autoFocus
              required
              margin="dense"
              id="content"
              name="content"
              label="Content"
              type="text"
              fullWidth
              variant="standard"
              sx={{ marginBottom: '10px' }}
              defaultValue={note?.content}
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
