'use client';

import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Underline } from '@tiptap/extension-underline';
import MenuBar from './menu-bar';

export let editor: Editor | null;

export default function TiptapEditor() {
  editor = useEditor({
    extensions: [StarterKit, Underline],
    editorProps: {
      attributes: {
        class: 'bg-zinc-100 hover:bg-zinc-200 focus:outline-none rounded-xl min-h-16 p-3',
      },
    },
    // content: '<p>Hello World! 🌎️</p>',
    onUpdate({ editor }) {
      console.log('editor getHtml: ', editor.getHTML());
    },
  });

  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
