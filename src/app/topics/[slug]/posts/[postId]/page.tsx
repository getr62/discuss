import Link from 'next/link';
import { Suspense } from 'react';
import { Button, Chip } from '@nextui-org/react';
import PostShow from '@/components/posts/post-show';
import PostShowLoading from '@/components/posts/post-show-loading';
import CommentList from '@/components/comments/comment-list';
import CommentCreateForm from '@/components/comments/comment-create-form';
import { fetchCommentsByPostId } from '@/db/queries/comments';

interface PostShowPageProps {
  params: {
    slug: string;
    postId: string;
  };
}

export default async function PostShowPage({ params }: PostShowPageProps) {
  const { slug, postId } = params;

  return (
    <div className='space-y-3'>
      <Suspense fallback={<PostShowLoading />}>
        <PostShow slug={slug} postId={postId} />
      </Suspense>
      <CommentCreateForm postId={postId} startOpen />
      <CommentList postId={postId} />
    </div>
  );
}
