'use server';

import { auth } from '@/lib/auth';

export async function getSessionData() {
  const session = await auth();
  console.log(`SESSION in get-session action: `, session);

  return session;
}
