import React, { useState } from 'react';
import Write from 'components/write/Write';

const WriteContainer = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const onChangeTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  };

  const onChangeEditor = (e, editor: any) => {
    const data = editor.getData();
    setBody(data);
  };

  return (
    <Write
      title={title}
      body={body}
      onChangeTitle={onChangeTitle}
      onChangeEditor={onChangeEditor}
    />
  );
};

export default WriteContainer;
