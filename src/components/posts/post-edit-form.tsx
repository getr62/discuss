'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { Input, Button, Textarea, Select, SelectItem } from '@nextui-org/react';
import * as actions from '@/actions';
import FormButton from '@/components/common/form-button';
import { PostWithData } from '@/db/queries/posts';
import paths from '@/lib/paths';

import TiptapEditor, { editor } from '@/components/rte/tiptap-editor';
import MenuBar from '../rte/menu-bar';
import { useEditor, EditorContent } from '@tiptap/react';

import { tiptapExtensions } from '../rte/utils';

interface PostEditFormProps {
  postWithData: PostWithData;
  topics: {
    slug: string;
  }[];
}

export default function PostEditForm({ postWithData, topics }: PostEditFormProps) {
  const editor = useEditor({
    extensions: [...tiptapExtensions],
    editorProps: {
      attributes: {
        class: 'bg-zinc-100 hover:bg-zinc-200 focus:outline-none rounded-xl min-h-16 p-3',
      },
    },
    // content: '',
  });

  useEffect(() => {
    // console.log('useEffect PostEditForm setContent in editor: ', postWithData.content);
    editor?.commands.setContent(postWithData.content);
  }, [editor, postWithData.content]);

  const content = editor?.getHTML() as string;
  console.log('content from editor getHTML: ', content);

  const [formState, action] = useFormState(actions.editPost.bind(null, content), {
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
          {/* <Textarea
            isInvalid={!!formState.errors.content}
            errorMessage={formState.errors.content?.join(', ')}
            name='content'
            label='Content'
            labelPlacement='outside'
            placeholder='Content'
            defaultValue={postWithData.content}
          /> */}
          <MenuBar editor={editor} />
          <EditorContent editor={editor} />
          {/* <TiptapEditor /> */}

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
          <Link href={paths.postShow(postWithData.topic.slug, postWithData.id)}>
            <Button>Cancel</Button>
          </Link>
          <FormButton>Save</FormButton>
        </div>
      </form>
    </>
  );
}
