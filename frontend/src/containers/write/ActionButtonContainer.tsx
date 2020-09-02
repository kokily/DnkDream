import React from 'react';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { useHistory, useParams } from 'react-router-dom';
import { ADD_POST, UPDATE_POST } from 'graphql/post.queries';
import ActionButton from 'components/write/ActionButton';
import { toast } from 'react-toastify';

interface ContainerProps {
  title: string;
  body: string;
  edit?: boolean;
}

const ActionButtonContainer: React.FC<ContainerProps> = ({
  title,
  body,
  edit,
}) => {
  const client = useApolloClient();
  const history = useHistory();
  const { postId } = useParams();
  const [AddPost] = useMutation(ADD_POST);
  const [UpdatePost] = useMutation(UPDATE_POST);

  const onPublish = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if ([title, body].includes('')) {
      toast.error('제목과 내용을 작성하세요!');
      return;
    }

    let thumbnail = '';

    if (document.getElementsByTagName('img')[0]) {
      thumbnail = document.getElementsByTagName('img')[0].src;
    }

    try {
      if (!edit) {
        const response = await AddPost({
          variables: {
            title,
            body,
            thumbnail,
          },
        });

        if (!response || !response.data) return;

        toast.success('포스트 작성 성공!');

        await client.clearStore();

        history.push('/');
      } else {
        const response = await UpdatePost({
          variables: {
            id: postId,
            title,
            body,
            thumbnail,
            updatedAt: new Date(),
          },
        });

        if (!response || !response.data) return;

        toast.success('포스트 수정 성공');

        await client.clearStore();

        history.goBack();
      }
    } catch (err) {
      toast.error(err);
    }
  };

  const onCancel = async () => {
    await client.clearStore();
    history.push('/');
  };

  return <ActionButton onPublish={onPublish} onCancel={onCancel} />;
};

export default ActionButtonContainer;
