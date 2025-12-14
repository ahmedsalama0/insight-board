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
import { Editor } from '@tinymce/tinymce-react';
import { TINY_MCE_API_KEY } from '@/app/global/constants';

export default function FormNoteView({ note }: { note: Note }) {
  const [open, setOpen] = React.useState(false);
  const editorRef = React.useRef<any>(null);

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
              id="title"
              name="title"
              label="Title"
              type="text"
              fullWidth
              variant="standard"
              sx={{ marginBottom: '10px' }}
              value={note?.title}
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
            />
            <Editor
              id="editor"
              initialValue={note?.content}
              onInit={(_evt, editor) => {
                editorRef.current = editor;
              }}
              disabled
              readonly
              apiKey={TINY_MCE_API_KEY}
              init={{
                height: 500,
                plugins: 'lists link image table code help wordcount',
                toolbar:
                  'undo redo | formatselect | bold italic emoticons | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent',
                //skin: 'oxide-dark',
                //content_css: 'dark',
                menubar: 'file edit view',
              }}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
