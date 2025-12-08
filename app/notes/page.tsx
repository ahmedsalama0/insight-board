import { Divider } from '@mui/material';
import NotesPageHeader from '../ui/components/NotesPageHeader';
import NotesPageBody from '../ui/components/NotesPageBody';

export default function Page() {
  return (
    <div>
      <header className="@container">
        <NotesPageHeader />
      </header>
      <Divider sx={{ backgroundColor: '#aaa' }} />
      <NotesPageBody />
    </div>
  );
}
