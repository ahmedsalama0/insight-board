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
import { Editor } from '@tinymce/tinymce-react';

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

  function onEditorChange(value: any) {
    console.log(value);
    const newNote = {
      id: note.id,
      title: note.title,
      content: value,
    };
    console.log(newNote);
    updateNoteContentMutate(newNote);
  }
  function onInputChange(event: any) {
    const newNote = {
      id: note.id,
      title: event.target.value,
      //content: editorRef.current,
    };
    console.log(newNote);
    updateNoteContentMutate(newNote);
  }

  function onTitleChange(event: any) {
    console.log(event);
    const updatedNote = {
      id: note.id,
      title: event.target.value,
      content: note.content,
    };
    console.log(updatedNote);
    updateNoteContentMutate(updatedNote);
  }

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
            {/* <TextField
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
            /> */}
            <TextField
              autoFocus
              required
              margin="dense"
              id="title"
              name="title"
              label="Title"
              type="text"
              fullWidth
              variant="standard"
              sx={{ marginBottom: '10px' }}
              //defaultValue={note?.title}
              defaultValue={note.title}
              // onChange={onInputChange}
              onChange={inputDebounce(onTitleChange)}
            />
            <Editor
              id="editor"
              initialValue={note?.content}
              //value={editorValue}
              // onEditorChange={inputDebounce(onEditorChange)}
              onEditorChange={inputDebounce(onEditorChange)}
              apiKey="7179zvyqsfev6w107oa1uy6m3uhw8nzv68nbddz6gbw4d59t"
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
          {/* <Button type="submit" form="subscription-form">
            Save
          </Button> */}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
