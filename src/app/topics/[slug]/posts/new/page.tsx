import PostCreateForm from '@/components/posts/post-create-form';

interface PostCreatePageProps {
  params: {
    slug: string;
  };
}

export default function PostCreatePost({ params }: PostCreatePageProps) {
  const { slug } = params;

  return (
    <div className='space-y-3'>
      <PostCreateForm slug={slug} />
    </div>
  );
}
