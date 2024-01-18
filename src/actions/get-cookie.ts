'use server';

import { cookies } from 'next/headers';
import { decode } from '@auth/core/jwt';

export async function getSessionCookie() {
  const cookieStore = cookies();
  //   console.log('action getCookies: ', cookieStore);

  let sessionToken;
  if (cookieStore.has('authjs.session-token')) {
    // console.log('found session token');
    sessionToken = cookieStore.get('authjs.session-token');
    // console.log(sessionToken?.value);
  }

  const decoded = await decode({
    secret: process.env.AUTH_SECRET || '',
    token: sessionToken?.value,
    salt: 'authjs.session-token',
  });

  console.log(
    `${new Date().getUTCHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}:${new Date().getMilliseconds()} username in session token: `,
    decoded?.name
  );

  if (sessionToken) {
    return true;
  }

  return false;
}
