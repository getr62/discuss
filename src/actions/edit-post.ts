'use server';

import type { Post } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import paths from '@/lib/paths';

const editPostSchema = z.object({
  id: z.string().cuid(),
  title: z.string().min(3),
  content: z.string().min(10),
  topic: z.string(),
});

interface EditPostFormState {
  errors: {
    id?: string[];
    title?: string[];
    content?: string[];
    topic?: string[];
    _form?: string[];
  };
}

export async function editPost(
  slug: string,
  formState: EditPostFormState,
  formData: FormData
): Promise<EditPostFormState> {
  const result = editPostSchema.safeParse({
    id: formData.get('id'),
    title: formData.get('title'),
    content: formData.get('content'),
    topic: formData.get('topic'),
  });

  //   console.log('formData result: ', formData);

  if (!result.success) {
    console.log('error result', result.error);
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const session = await auth();
  if (!session || !session.user) {
    return {
      errors: {
        _form: ['You must be signed in to do this'],
      },
    };
  }

  const topic = await db.topic.findFirst({
    // where: { slug: postWithData.topic.slug },
    where: { slug: result.data.topic },
  });

  if (!topic) {
    return {
      errors: {
        _form: ['Cannot find topic'],
      },
    };
  }

  let post: Post;
  try {
    post = await db.post.update({
      where: { id: result.data.id },
      data: {
        title: result.data.title,
        content: result.data.content,
        userId: session.user.id,
        topicId: topic.id,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ['Failed to edit post'],
        },
      };
    }
  }

  revalidatePath(paths.topicShow(topic.slug));
  redirect(paths.postShow(topic.slug, post.id));
}
