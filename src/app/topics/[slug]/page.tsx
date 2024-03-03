import PostCreateForm from '@/components/posts/post-create-form';
import PostList from '@/components/posts/post-list';
import { fetchPostsByTopicSlug } from '@/db/queries/posts';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import paths from '@/lib/paths';

interface TopicShowPageProps {
  params: {
    slug: string;
  };
}

export default function TopicShowPage({ params }: TopicShowPageProps) {
  const { slug } = params;

  return (
    <div className='grid grid-cols-4 gap-4 p-4'>
      <div className='col-span-3'>
        <h1 className='text-2xl font-bold mb-4'>{slug}</h1>
        <PostList fetchData={() => fetchPostsByTopicSlug(slug)} />
      </div>

      <div>
        {/* <PostCreateForm slug={slug} /> */}
        <Button as={Link} href={paths.postCreate(slug)}>
          Create Post
        </Button>
      </div>
    </div>
  );
}
