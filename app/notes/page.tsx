'use client';
import { Divider } from '@mui/material';
import NotesPageHeader from '../ui/components/NotesPageHeader';
import NotesPageBody from '../ui/components/NotesPageBody';
import { useAuthGuard } from '../hooks/useAuthGuard';

export default function Page() {
  const authorized = useAuthGuard();

  if (!authorized) return null;

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
