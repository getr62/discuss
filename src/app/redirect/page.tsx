// 'use client';

import dynamic from 'next/dynamic';

import RedirectButton from '@/components/common/redirect-button';

const DynamicButton = dynamic(() => import('@/components/common/redirect-button'));

export default async function Redirect() {
  return (
    <div className='flex justify-center mx-auto mt-36'>
      {/* <RedirectButton /> */}
      <DynamicButton />
    </div>
  );
}
