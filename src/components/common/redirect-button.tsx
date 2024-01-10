'use client';

import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

export default function RedirectButton() {
  const router = useRouter();

  const handleClick = async () => {
    () => window.location.reload();
    await new Promise((resolve) => setTimeout(resolve, 2500));
    router.push('/');
  };

  return (
    <Button className='w-32' onClick={handleClick}>
      go home
    </Button>
  );
}
