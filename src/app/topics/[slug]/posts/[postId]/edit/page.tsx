import { Suspense } from 'react';
import PostShowLoading from '@/components/posts/post-show-loading';
import PostEditForm from '@/components/posts/post-edit-form';
import { fetchSinglePost } from '@/db/queries/posts';
import { notFound } from 'next/navigation';
import { db } from '@/db';

interface PostEditPageProps {
  params: {
    slug: string;
    postId: string;
  };
}

export default async function PostEditPage({ params }: PostEditPageProps) {
  const { postId } = params;

  const postWithData = await fetchSinglePost(postId);
  const topics = await db.topic.findMany({
    select: {
      slug: true,
    },
  });

  if (!postWithData) {
    notFound();
  }

  return (
    <div className='space-y-3'>
      <Suspense fallback={<PostShowLoading />}>
        <PostEditForm postWithData={postWithData} topics={topics} />
      </Suspense>
    </div>
  );
}
