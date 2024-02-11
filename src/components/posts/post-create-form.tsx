'use client';

import { useFormState } from 'react-dom';
import {
  Input,
  Button,
  Textarea,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@nextui-org/react';
import * as actions from '@/actions';
import FormButton from '@/components/common/form-button';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Underline } from '@tiptap/extension-underline';
import MenuBar from '../rte/menu-bar';
import Tiptap, { editor } from '../rte/tiptap-editor';

interface PostCreateFormProps {
  slug: string;
}

export default function PostCreateForm({ slug }: PostCreateFormProps) {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    editorProps: {
      attributes: {
        class: 'bg-zinc-100 hover:bg-zinc-200 focus:outline-none rounded-xl min-h-16 p-3',
      },
    },
    content: '<p>Hello World! 🌎️</p>',
    // onUpdate({ editor }) {
    //   console.log('editor getHtml: ', editor.getHTML());
    // },
  });

  const content = editor?.getHTML() as string;

  const [formState, action] = useFormState(actions.createPost.bind(null, slug, content), {
    errors: {},
  });

  return (
    <Popover placement='left'>
      <PopoverTrigger>
        <Button color='primary'>Create a Post</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={action}>
          <div className='flex flex-col gap-4 p-4 w-[720px]'>
            <h3 className='text-lg'>Create a Post</h3>

            <Input
              isInvalid={!!formState.errors.title}
              errorMessage={formState.errors.title?.join(', ')}
              name='title'
              label='Title'
              labelPlacement='outside'
              placeholder='Title'
            />
            {/* <Textarea
              isInvalid={!!formState.errors.content}
              errorMessage={formState.errors.content?.join(', ')}
              name='content'
              value={editor?.getHTML()}
              label='Content'
              labelPlacement='outside'
              placeholder='Content'
            /> */}
            {/* <Tiptap /> */}
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
            {/* <Tiptap /> */}

            {formState.errors._form ? (
              <div className='rounded p-2 bg-red-200 border border-red-400'>
                {formState.errors._form.join(', ')}
              </div>
            ) : null}

            <FormButton>Create Post</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
