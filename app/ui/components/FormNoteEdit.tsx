'use client';
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PenIcon from '../icons/PenIcon';
import { Note } from '@/app/tasks/models/types.model';
import { useNotesUpdateData } from '@/app/hooks/useNotesData';
import { inputDebounce } from '@/app/utilities/inputDebounce';

export default function FormNoteEdit({ note }: { note: Note }) {
  const {
    data,
    isError,
    mutate: updateNoteContentMutate,
  } = useNotesUpdateData();

  const [open, setOpen] = React.useState(false);
  const [inputChanged, setInputChanged] = React.useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function onInputChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const newNote = {
      id: note.id,
      content: event.target.value,
    };
    updateNoteContentMutate(newNote);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());

    // const newNote = {
    //   id: note.id,
    //   content: formJson?.content,
    // };

    // updateNoteContentMutate(newNote);

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
              //onChange={onInputChange}
              onChange={inputDebounce(onInputChange)}
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
