import Link from 'next/link';
import { Suspense } from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react';
import HeaderAuth from '@/components/header-auth';
import SearchInput from '@/components/search-input';
import dynamic from 'next/dynamic';

const DynamicHeaderAuth = dynamic(() => import('./header-auth'), {
  ssr: false,
});

export default function Header() {
  return (
    <Navbar className='shadow mb-6'>
      <NavbarBrand>
        <Link href='/' className='font-bold'>
          Discuss
        </Link>
      </NavbarBrand>
      <NavbarContent>
        <NavbarItem>
          <Link href='/dashboard'>Dashboard</Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent>
        <NavbarItem>
          <Suspense>
            <SearchInput />
          </Suspense>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify='end'>
        {/* <HeaderAuth /> */}
        <DynamicHeaderAuth />
      </NavbarContent>
    </Navbar>
  );
}
