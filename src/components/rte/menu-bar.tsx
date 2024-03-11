import { Editor } from '@tiptap/react';
import {
  IconAlignCenter,
  IconAlignLeft,
  IconAlignJustify,
  IconAlignRight,
  IconBold,
  IconItalic,
  IconStrikethrough,
  IconUnderline,
  IconHeading,
  IconList,
  IconListOrdered,
  IconRedo,
  IconUndo,
  IconQuote,
} from './icons';
import React from 'react';

interface MenuBarProps {
  editor: Editor | null;
}

export default function MenuBar({ editor }: MenuBarProps) {
  if (!editor) {
    return null;
  }

  return (
    <div className='flex gap-2'>
      <div className='flex gap-1'>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
          className={`border rounded-md p-1 ${
            editor.isActive('bold') ? 'bg-zinc-200' : ''
          }`}
        >
          <IconBold />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleItalic().run();
          }}
          className={`border rounded-md p-1 ${
            editor.isActive('italic') ? 'bg-zinc-200' : ''
          }`}
        >
          <IconItalic />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleUnderline().run();
          }}
          className={`border rounded-md p-1 ${
            editor.isActive('underline') ? 'bg-zinc-200' : ''
          }`}
        >
          <IconUnderline />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleStrike().run();
          }}
          className={`border rounded-md p-1 ${
            editor.isActive('strike') ? 'bg-zinc-200' : ''
          }`}
        >
          <IconStrikethrough />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 2 }).run();
          }}
          className={`border rounded-md p-1 ${
            editor.isActive('heading', { level: 2 }) ? 'bg-zinc-200' : ''
          }`}
        >
          <IconHeading />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBulletList().run();
          }}
          className={`border rounded-md p-1 ${
            editor.isActive('bulletList') ? 'bg-zinc-200' : ''
          }`}
        >
          <IconList />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleOrderedList().run();
          }}
          className={`border rounded-md p-1 ${
            editor.isActive('orderedList') ? 'bg-zinc-200' : ''
          }`}
        >
          <IconListOrdered />
        </button>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().setTextAlign('left').run();
            }}
            className={`border rounded-md p-1 ${
              editor.isActive({ textAlign: 'left' }) ? 'bg-zinc-200' : ''
            }`}
          >
            <IconAlignLeft />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().setTextAlign('center').run();
            }}
            className={`border rounded-md p-1 ${
              editor.isActive({ textAlign: 'center' }) ? 'bg-zinc-200' : ''
            }`}
          >
            <IconAlignCenter />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().setTextAlign('right').run();
            }}
            className={`border rounded-md p-1 ${
              editor.isActive({ textAlign: 'right' }) ? 'bg-zinc-200' : ''
            }`}
          >
            <IconAlignRight />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().setTextAlign('justify').run();
            }}
            className={`border rounded-md p-1 ${
              editor.isActive({ textAlign: 'justify' }) ? 'bg-zinc-200' : ''
            }`}
          >
            <IconAlignJustify />
          </button>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBlockquote().run();
          }}
          className={`border rounded-md p-1 ${
            editor.isActive('blockquote') ? 'bg-zinc-200' : ''
          }`}
        >
          <IconQuote />
        </button>
      </div>
      <div className='flex gap-1'>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().undo().run();
          }}
          disabled={!editor.can().undo()}
          className={`border rounded-md p-1 ${editor.can().undo() ? 'bg-zinc-200' : ''}`}
        >
          <IconUndo />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().redo().run();
          }}
          disabled={!editor.can().redo()}
          className={`border rounded-md p-1 ${editor.can().redo() ? 'bg-zinc-200' : ''}`}
        >
          <IconRedo />
        </button>
      </div>
    </div>
  );
}
