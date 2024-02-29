'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import { useEffect } from 'react';
import { tiptapExtensions, style } from './utils';

interface EditorViewProps {
  content: string;
}

const EditorView = ({ content }: EditorViewProps) => {
  const editor = useEditor({
    extensions: [...tiptapExtensions],
    editorProps: {
      attributes: {
        class: style,
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
