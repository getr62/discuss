'use client';

import { useFormState } from 'react-dom';
import { Input, Button, Textarea, Select, SelectItem } from '@nextui-org/react';
import * as actions from '@/actions';
import FormButton from '@/components/common/form-button';
import { PostWithData } from '@/db/queries/posts';
import Link from 'next/link';
import paths from '@/lib/paths';

interface PostEditFormProps {
  postWithData: PostWithData;
  topics: {
    slug: string;
  }[];
}

export default function PostEditForm({ postWithData, topics }: PostEditFormProps) {
  const [formState, action] = useFormState(actions.editPost, {
    errors: {},
  });

  return (
    <>
      <form action={action}>
        <div className='flex flex-col gap-4 p-4'>
          <h3 className='text-lg'>Edit your Post</h3>

          <input hidden name='id' defaultValue={postWithData.id} />

          <Input
            isInvalid={!!formState.errors.title}
            errorMessage={formState.errors.title?.join(', ')}
            name='title'
            label='Title'
            labelPlacement='outside'
            placeholder='Title'
            defaultValue={postWithData.title}
          />
          <Textarea
            isInvalid={!!formState.errors.content}
            errorMessage={formState.errors.content?.join(', ')}
            name='content'
            label='Content'
            labelPlacement='outside'
            placeholder='Content'
            defaultValue={postWithData.content}
          />

          <Select
            isInvalid={!!formState.errors.topic}
            errorMessage={formState.errors.topic?.join(', ')}
            name='topic'
            label='Change the topic'
            labelPlacement='outside'
            className='max-w-xl'
            defaultSelectedKeys={[postWithData.topic.slug]}
          >
            {topics.map((topic) => (
              <SelectItem key={topic.slug} value={topic.slug}>
                {topic.slug}
              </SelectItem>
            ))}
          </Select>

          {formState.errors._form ? (
            <div className='rounded p-2 bg-red-200 border border-red-400'>
              {formState.errors._form.join(', ')}
            </div>
          ) : null}
        </div>
        <div className='flex justify-end mr-8 space-x-2'>
          <Button
            as={Link}
            href={paths.postShow(postWithData.topic.slug, postWithData.id)}
          >
            Cancel
          </Button>
          <FormButton>Save</FormButton>
        </div>
      </form>
    </>
  );
}
