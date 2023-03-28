'use client';
import './globals.css';
import { useEffect } from 'react';
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import axios from 'axios';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  axios.defaults.withCredentials = true;

  useEffect(() => {
    const getCsrfToken = async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/csrf`
      );
      // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/csrf`, {
      //   method: 'GET',
      // });
      // const data = await res.json();
      axios.defaults.headers.common['csrf-token'] = data.csrfToken;
    };
    getCsrfToken();
  }, []);
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
              colorScheme: 'dark',
              fontFamily: 'Verdana, sans-serif',
            }}
          >
            <div className="flex min-h-screen flex-col items-center justify-center">
              <main className="flex w-screen flex-1 flex-col items-center justify-center">
                {children}
              </main>
            </div>
          </MantineProvider>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </body>
    </html>
  );
}
