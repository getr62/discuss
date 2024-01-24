'use client';

import { Divider } from '@nextui-org/react';
import { User } from '@prisma/client';
import { useSession } from 'next-auth/react';
import TopicCreateForm from './topic-create-form';

function TopicPopover() {
  const session = useSession();
  console.log('user in session (topic-popover): ', session.data?.user);

  const sessionUser: User = session.data?.user as User;

  return (
    <div className={sessionUser?.role !== 'admin' ? 'hidden' : ''}>
      <TopicCreateForm />
      <Divider className='my-2' />
    </div>
  );
}

export default TopicPopover;
