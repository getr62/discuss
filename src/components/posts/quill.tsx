'use client';

import dynamic from 'next/dynamic';
import { useState, forwardRef } from 'react';
// import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), {
  // Set this to `false` so it is only loaded on the client.
  ssr: false,
  // You can also add an indicator while the component is loading.
  loading: () => <p>Loading ...</p>,
});

const toolbarOptions = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    [{ script: 'sub' }, { script: 'super' }],
    ['blockquote', 'code-block'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }, { align: [] }],
    ['link', 'image', 'video'],
    ['clean'],
  ],
};

export default function Quill() {
  const [value, setValue] = useState('');

  return (
    <ReactQuill
      theme='snow'
      modules={toolbarOptions}
      value={value}
      onChange={setValue}
      className='min-h-44'
    />
  );
}
