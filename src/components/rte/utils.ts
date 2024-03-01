import lowlight from 'lowlight'; // https://tiptap.dev/docs/editor/api/nodes/code-block-lowlight
// import StarterKit from '@tiptap/starter-kit';
import Blockquote from '@tiptap/extension-blockquote';
import Bold from '@tiptap/extension-bold';
import BulletList from '@tiptap/extension-bullet-list';
import Code from '@tiptap/extension-code';
import CodeBlock from '@tiptap/extension-code-block';
import Document from '@tiptap/extension-document';
import Dropcursor from '@tiptap/extension-dropcursor';
import Gapcursor from '@tiptap/extension-gapcursor';
import HardBreak from '@tiptap/extension-hard-break';
import Heading from '@tiptap/extension-heading';
import History from '@tiptap/extension-history';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Italic from '@tiptap/extension-italic';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import Paragraph from '@tiptap/extension-paragraph';
import Placeholder from '@tiptap/extension-placeholder';
import Strike from '@tiptap/extension-strike';
import Text from '@tiptap/extension-text';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';

export const tiptapExtensions = [
  // StarterKit,
  Blockquote,
  Bold,
  // BulletList,
  BulletList.configure({
    HTMLAttributes: {
      class: 'ml-12 list-disc',
    },
    keepAttributes: true,
  }),
  Code,
  CodeBlock,
  Document,
  Dropcursor,
  Gapcursor,
  HardBreak,
  Heading,
  History,
  HorizontalRule,
  Italic,
  ListItem,
  OrderedList.configure({
    HTMLAttributes: {
      class: 'ml-12 list-decimal',
    },
    keepAttributes: true,
  }),
  Paragraph,
  Placeholder.configure({
    placeholder: 'Fill in the content',
    emptyEditorClass:
      'cursor-text before:content-[attr(data-placeholder)] before:absolute before:top-2 before:left-2 before:text-mauve-11 before:opacity-50 before-pointer-events-none',
  }),
  Strike,
  Text,
  TextAlign.configure({
    types: ['heading', 'paragraph'],
    // alignments: ['left', 'center', 'right', 'justify'],
  }),
  Underline,
];

export const style =
  'bg-zinc-100 hover:bg-zinc-200 focus:outline-none rounded-xl min-h-16 p-3';
