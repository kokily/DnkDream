import React, { useState } from 'react';
import Edit from 'components/write/Edit';
import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';
import { READ_POST } from 'graphql/post.queries';

const EditContainer = () => {
  const { postId } = useParams();
  const { data, loading, error } = useQuery(READ_POST, {
    variables: { id: postId },
  });
  const [title, setTitle] = useState(
    data?.ReadPost?.ok && data.ReadPost.post.title
  );
  const [body, setBody] = useState(
    data?.ReadPost.ok && data.ReadPost.post.body
  );

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  };

  const onChangeEditor = (e, editor: any) => {
    const data = editor.getData();
    setBody(data);
  };

  if (loading) return null;
  if (error) return null;

  return (
    <Edit
      title={title}
      body={body}
      onChange={onChange}
      onChangeEditor={onChangeEditor}
    />
  );
};

export default EditContainer;
