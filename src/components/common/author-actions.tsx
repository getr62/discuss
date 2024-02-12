'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@nextui-org/react';
import * as actions from '@/actions';
import { useSession } from 'next-auth/react';
import React from 'react';

interface PostShowPageProps {
  slug: string;
  postId: string;
  user: string;
}

export default function AuthorActions({ slug, postId, user }: PostShowPageProps) {
  const session = useSession();
  const { pending } = useFormStatus();

  const deletePostAction = actions.deletePost.bind(null, { slug, postId });

  let authorContent: React.ReactNode;
  if (session.status === 'loading') {
    authorContent = null;
  } else if (session.data?.user?.name === user) {
    authorContent = (
      <div className='flex ml-auto space-x-2'>
        <Button color='success' variant='bordered'>
          Edit
        </Button>
        <form action={deletePostAction}>
          <Button type='submit' color='danger' variant='flat' isLoading={pending}>
            Delete
          </Button>
        </form>
      </div>
    );
  } else {
    authorContent = (
      <div className='flex ml-auto'>
        <div className='mr-4 pt-0.5'>Author:</div>
        <div className='text-xl font-bold mr-6'>{user}</div>
      </div>
    );
  }

  return authorContent;
}
