'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Underline } from '@tiptap/extension-underline';
import { useEffect } from 'react';

interface EditorViewProps {
  content: string;
}

const EditorView = ({ content }: EditorViewProps) => {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    editorProps: {
      attributes: {
        class: 'bg-zinc-100 hover:bg-zinc-200 focus:outline-none rounded-xl min-h-16 p-3',
      },
    },
    editable: false,
    // content: '',
  });

  useEffect(() => {
    editor?.commands.setContent(content);
  }, [editor]);

  return (
    <div>
      <EditorContent editor={editor} />
    </div>
  );
};

export default EditorView;
