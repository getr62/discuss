'use client';

import Link from 'next/link';
import {
  Chip,
  NavbarItem,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@nextui-org/react';
import { Icon } from 'react-icons-kit';
import { pacman } from 'react-icons-kit/icomoon/pacman';
import { getSession, useSession } from 'next-auth/react';
import * as actions from '@/actions';
import { useEffect, useRef, useState } from 'react';
import { getSessionCookie } from '@/actions/get-cookie';
import { getSessionData } from '@/actions/get-session';
import type { Session } from 'next-auth';

export default function HeaderAuth() {
  // const [loading, setLoading] = useState(true);
  // const [sessionA, setSessionA] = useState<Session | null>(null);
  // const [sessionB, setSessionB] = useState<Session | null>(null);

  // const componentIsMounted = useRef(true);
  // useEffect(() => {
  //   console.log('useEffect for componentIsMounted run');
  //   // each useEffect can return a cleanup function
  //   return () => {
  //     componentIsMounted.current = false;
  //   };
  // }, []);

  const session = useSession();
  console.log('session from useSession: ', session);

  let userSession: Session | null = null;
  const getUserSession = async () => {
    userSession = await getSessionData();
    console.log('getUserSession: ', userSession);
  };
  if (!userSession) {
    getUserSession();
  }

  // useEffect(() => {
  //   const fetchSession = async () => {
  //     const result = await getSession({ broadcast: false, triggerEvent: false });
  //     console.log('SESSION A from getSession: ', result);
  //     setSessionA(result);
  //   };

  //   if (loading) {
  //     setLoading(false);
  //   }
  //   fetchSession();
  //   console.log('getSessin A in useEffect: ', sessionA);
  // }, [session.status]);

  // useEffect(() => {
  //   const getUserSession = async () => {
  //     const userSession = await getSessionData();
  //     console.log('SESSION B from getSessionData action: ', userSession);
  //     setSessionB(userSession);
  //   };

  //   if (loading) {
  //     setLoading(false);
  //   }
  //   getUserSession();
  //   console.log('SESSION B in useEffect: ', sessionB);
  // }, [session.status]);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('timeout run');
      if (userSession && session.status === 'unauthenticated') {
        window.location.reload();
      }
    }, 500);
    return () => clearTimeout(timer);
    // if (userSession && session.status === 'unauthenticated') {
    //   console.log('window.location.reload() run');
    //   window.location.reload();
    // }
  });

  let authContent: React.ReactNode;
  if (session.status === 'loading') {
    authContent = null;
  } else if (session.data?.user) {
    authContent = (
      <Popover placement='left'>
        <PopoverTrigger>
          <Chip
            className='cursor-pointer'
            startContent={<Icon icon={pacman} />}
            variant='faded'
            color='default'
          >
            {session.data.user.name}
          </Chip>
        </PopoverTrigger>
        <PopoverContent>
          <div className='p-4'>
            <form action={actions.signOut}>
              <Button type='submit'>Sign Out</Button>
            </form>
          </div>
        </PopoverContent>
      </Popover>
    );
  } else {
    authContent = (
      <>
        {/* <Button onClick={() => window.location.reload()}>Reload</Button> */}
        <NavbarItem>
          <Link href={'/sign-in'}>Sign In</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href={'/sign-up'}>Sign Up</Link>
        </NavbarItem>
      </>
    );
  }

  return authContent;
}
