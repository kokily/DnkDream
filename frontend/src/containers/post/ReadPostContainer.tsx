import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { toast } from 'react-toastify';
import ReadPost from 'components/post/ReadPost';
import { REMOVE_POST } from 'graphql/post.queries';
import usePost from 'hooks/usePost';
import PostButton from 'components/post/PostButton';

const ReadPostContainer = () => {
  const client = useApolloClient();
  const history = useHistory();
  const { postId } = useParams();
  const [{ data, loading }, { data: check }] = usePost({ postId });
  const [RemovePost] = useMutation(REMOVE_POST);

  const onBack = async () => {
    await client.clearStore();
    history.goBack();
  };

  const onEdit = () => {
    history.push(`/edit/${postId}`);
  };

  const onRemove = async () => {
    try {
      const response = await RemovePost({
        variables: { id: postId },
      });

      if (!response) return;

      await client.clearStore();

      toast.success('포스트 삭제 완료');
      history.goBack();
    } catch (err) {
      toast.error(err);
    }
  };

  if (loading) return null;

  return (
    <ReadPost
      post={data?.ReadPost?.ok && data.ReadPost.post}
      PostButton={
        check?.CheckUser?.ok &&
        check.CheckUser.user.admin && (
          <PostButton onBack={onBack} onEdit={onEdit} onRemove={onRemove} />
        )
      }
    />
  );
};

export default ReadPostContainer;
