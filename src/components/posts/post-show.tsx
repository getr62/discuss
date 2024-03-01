import { notFound } from 'next/navigation';
import { db } from '@/db';
import paths from '@/lib/paths';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import AuthorActions from '../common/author-actions';
import EditorView from '../rte/editor-view';

interface PostShowProps {
  slug: string;
  postId: string;
}

export default async function PostShow({ slug, postId }: PostShowProps) {
  // await new Promise((resolve) => setTimeout(resolve, 2500));

  const post = await db.post.findFirst({
    where: { id: postId },
    include: {
      user: { select: { name: true } },
    },
  });

  if (!post) {
    notFound();
  }

  return (
    <>
      <div className='flex'>
        <Button as={Link} href={paths.topicShow(slug)}>
          {'< '}Back to {slug}
        </Button>
        <AuthorActions slug={slug} postId={postId} user={post.user.name} />
      </div>
      <div className='m-4'>
        <h1 className='text-2xl font-bold my-2'>{post.title}</h1>
        {/* <p className='p-4 border rounded'>{post.content}</p> */}
        <EditorView content={post.content} />
        <div hidden>{post.userId}</div>
      </div>
    </>
  );
}
