'use client';
import Link from 'next/link';
import { useAuthGuard } from '../hooks/useAuthGuard';

export default function Page() {
  const authorized = useAuthGuard();

  if (!authorized) return null;
  return (
    <>
      <div>Dashboard Page</div>
      <Link href={'/tasks'}>Tasks</Link> <br />
      <Link href={'/notes'}>Notes</Link>
    </>
  );
}
