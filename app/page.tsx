'use client';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function Page() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      This is the main page of the app
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
