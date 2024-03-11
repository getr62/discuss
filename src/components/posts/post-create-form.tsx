'use client';

import * as actions from '@/actions';
import FormButton from '@/components/common/form-button';
import paths from '@/lib/paths';
import { Button, Input } from '@nextui-org/react';
import { EditorContent, useEditor } from '@tiptap/react';
import Link from 'next/link';
import { useFormState } from 'react-dom';
import MenuBar from '../rte/menu-bar';
import { style, tiptapExtensions } from '../rte/utils';

interface PostCreateFormProps {
  slug: string;
}

export default function PostCreateForm({ slug }: PostCreateFormProps) {
  const editor = useEditor({
    extensions: [...tiptapExtensions],
    editorProps: {
      attributes: {
        class: style,
      },
    },
    // content: '',
    // onUpdate({ editor }) {
    //   console.log('editor getHtml: ', editor.getHTML());
    // },
  });

  const content = editor?.getHTML() as string;

  const [formState, action] = useFormState(actions.createPost.bind(null, slug, content), {
    errors: {},
  });

  return (
    <form action={action}>
      <div className='flex flex-col gap-4 p-4'>
        <h3 className='text-lg'>Create a Post</h3>

        <Input
          isInvalid={!!formState.errors.title}
          errorMessage={formState.errors.title?.join(', ')}
          name='title'
          label='Title'
          labelPlacement='outside'
          placeholder='Title'
        />

        <MenuBar editor={editor} />
        <EditorContent editor={editor} />

        {formState.errors._form ? (
          <div className='rounded p-2 bg-red-200 border border-red-400'>
            {formState.errors._form.join(', ')}
          </div>
        ) : null}

        <div className='flex space-x-20'>
          <p className='text-xs text-gray-400'>Topic: {slug}</p>
          <div className='flex justify-end mr-8 space-x-2'>
            <Button as={Link} href={paths.topicShow(slug)} className='ml-auto'>
              Cancel
            </Button>
            <FormButton>Save Post</FormButton>
          </div>
        </div>
      </div>
    </form>
  );
}
