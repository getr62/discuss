'use client';

import { NextUIProvider } from '@nextui-org/react';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

interface ProvidersProps {
  children: React.ReactNode;
  session?: Session | null;
}

export default function Providers({ children, session }: ProvidersProps) {
  return (
    <SessionProvider session={session}>
      <NextUIProvider>{children}</NextUIProvider>
    </SessionProvider>
  );
}
