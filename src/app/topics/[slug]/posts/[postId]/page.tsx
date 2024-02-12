import Link from 'next/link';
import { Suspense } from 'react';
import { Button, Chip } from '@nextui-org/react';
import PostShow from '@/components/posts/post-show';
import PostShowLoading from '@/components/posts/post-show-loading';
import CommentList from '@/components/comments/comment-list';
import CommentCreateForm from '@/components/comments/comment-create-form';
import paths from '@/lib/paths';
import * as actions from '@/actions';
import { fetchCommentsByPostId } from '@/db/queries/comments';

interface PostShowPageProps {
  params: {
    slug: string;
    postId: string;
  };
}

export default async function PostShowPage({ params }: PostShowPageProps) {
  const { slug, postId } = params;
  const deletePostAction = actions.deletePost.bind(null, { slug, postId });

  return (
    <div className='space-y-3'>
      <div className='flex'>
        <Link href={paths.topicShow(slug)}>
          <Chip>
            {'< '}Back to {slug}
          </Chip>
        </Link>
        <div className='flex ml-auto space-x-2'>
          <Button color='success' variant='bordered'>
            Edit
          </Button>
          <form action={deletePostAction}>
            <Button type='submit' color='danger' variant='flat'>
              Delete
            </Button>
          </form>
        </div>
      </div>
      <Suspense fallback={<PostShowLoading />}>
        <PostShow postId={postId} />
      </Suspense>
      <CommentCreateForm postId={postId} startOpen />
      <CommentList postId={postId} />
    </div>
  );
}
