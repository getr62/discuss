'use client';

import * as actions from '@/actions';
import { useCurrentSession } from '@/hooks/useGetSession';
import {
  Button,
  Chip,
  NavbarItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react';
import Link from 'next/link';
import { Icon } from 'react-icons-kit';
import { pacman } from 'react-icons-kit/icomoon/pacman';

export default function HeaderAuth() {
  const { session, status } = useCurrentSession();

  let authContent: React.ReactNode;
  if (status === 'loading') {
    authContent = null;
  } else if (session && status === 'authenticated') {
    authContent = (
      <Popover placement='left'>
        <PopoverTrigger>
          <Chip
            className='cursor-pointer'
            startContent={<Icon icon={pacman} />}
            variant='faded'
            color='default'
          >
            {session!.user!.name}
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
