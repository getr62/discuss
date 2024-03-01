'use client';

import { Divider } from '@nextui-org/react';
import { User } from '@prisma/client';
import { useSession } from 'next-auth/react';
import TopicCreateForm from './topic-create-form';
import React from 'react';

function Topics() {
  const session = useSession();
  // console.log('user in session (topic-popover): ', session.data?.user);

  const sessionUser: User = session.data?.user as User;

  let topicsContent: React.ReactNode;
  if (sessionUser?.role === 'admin') {
    topicsContent = (
      <>
        <TopicCreateForm />
        <Divider className='my-2' />
        <h3 className='text-lg my-2'>Topics</h3>
      </>
    );
  } else {
    topicsContent = <h3 className='text-lg my-2'>Topics</h3>;
  }

  return topicsContent;
}

export default Topics;
