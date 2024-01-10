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
import { useSession } from 'next-auth/react';
import * as actions from '@/actions';
// import { useEffect, useState } from 'react';

export default function HeaderAuth() {
  const session = useSession();
  console.log('session 1 from useSession in header-auth: ', session);

  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     // if (loading) window.location.reload();
  //     setLoading(false);
  //   }, 1000);
  //   return () => clearTimeout(timer);
  // }, []);

  let authContent: React.ReactNode;
  if (session.status === 'loading') {
    authContent = null;
    // setLoading(true);
    console.log('session status: ', session.status);
  } else if (session.data?.user) {
    // setLoading(false);
    console.log('session 2 from useSession in header-auth: ', session);
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
    // setLoading(false);
    authContent = (
      <>
        <Button onClick={() => window.location.reload()}>Reload</Button>
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
