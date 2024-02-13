'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';
import { db } from '@/db';
import paths from '@/lib/paths';

interface DeletePostProps {
  slug: string;
  postId: string;
}

export async function deletePost({ slug, postId }: DeletePostProps) {
  const session = await auth();
  if (!session || !session.user) {
    throw new Error('Something went wrong');
  }

  await db.post.delete({
    where: { id: postId },
  });

  revalidatePath(paths.home());
  revalidatePath(paths.postShow(slug, postId));
  redirect(paths.topicShow(slug));
}
