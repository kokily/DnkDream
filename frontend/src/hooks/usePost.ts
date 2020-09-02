import { useQuery } from '@apollo/react-hooks';
import { READ_POST } from 'graphql/post.queries';
import { CHECK_USER } from 'graphql/auth.queries';

const usePost = ({ postId }) => {
  const readPost = useQuery(READ_POST, {
    variables: { id: postId },
  });

  const check = useQuery(CHECK_USER);

  return [readPost, check];
};

export default usePost;
