'use client';

import { Editor } from '@tinymce/tinymce-react';
import { useEffect, useRef, useState } from 'react';

export default function EditorClient({
  initialValue,
}: {
  initialValue: string;
}) {
  const editorRef = useRef<any>(null);
  const [dirty, setDirty] = useState(false);
  useEffect(() => setDirty(false), [initialValue]);

  const save = () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      setDirty(false);
      editorRef.current.setDirty(false);
      // an application would save the editor content to the server here
      console.log(content);
    }
  };

  if (!editorRef) return <div>LOADING...</div>;

  return (
    <>
      <Editor
        initialValue={`<p>tttt<strong>ttt</strong>t</p>`}
        onInit={(_evt, editor) => (editorRef.current = editor)}
        onDirty={() => setDirty(true)}
        apiKey="7179zvyqsfev6w107oa1uy6m3uhw8nzv68nbddz6gbw4d59t"
        init={{
          height: 500,
          plugins: 'lists link image table code help wordcount',
          toolbar:
            'undo redo | formatselect | bold italic emoticons | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent',
          //skin: 'oxide-dark',
          //content_css: 'dark',
          menubar: 'file edit view',
        }}
      />
      <button
        className="bg-amber-50 text-black p-1.5 m-2 rounded hover:bg-[#777]"
        onClick={save}
        disabled={!dirty}
      >
        Save
      </button>
      {dirty && <p>You have unsaved content!</p>}
    </>
  );
}

// https://www.tiny.cloud/docs/tinymce/latest/react-ref/#using-the-tinymce-react-component-as-a-uncontrolled-component
