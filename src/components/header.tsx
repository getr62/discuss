import Link from 'next/link';
import { Suspense } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Chip,
} from '@nextui-org/react';
import { pacman } from 'react-icons-kit/icomoon/pacman';
import { auth } from '@/lib/auth';
import * as actions from '@/actions';
import SearchInput from '@/components/search-input';
import Icon from 'react-icons-kit';

export default async function Header() {
  const session = await auth();

  let authContent: React.ReactNode;
  if (session?.user) {
    authContent = (
      <Popover placement='left'>
        <PopoverTrigger>
          <Chip
            className='cursor-pointer'
            startContent={<Icon icon={pacman} />}
            variant='faded'
            color='default'
          >
            {session.user.name}
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

  return (
    <Navbar className='shadow mb-6'>
      <NavbarBrand>
        <Link href='/' className='font-bold'>
          Discuss
        </Link>
      </NavbarBrand>
      <NavbarContent justify='center'>
        <NavbarItem>
          <Suspense>
            <SearchInput />
          </Suspense>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify='end'>{authContent}</NavbarContent>
    </Navbar>
  );
}
