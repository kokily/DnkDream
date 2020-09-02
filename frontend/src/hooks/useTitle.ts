import { useState, useCallback } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { LIST_POSTS } from 'graphql/post.queries';
import useScroll from './useScroll';

const useTitle = (title?: string) => {
  const { data, loading, error, fetchMore } = useQuery(LIST_POSTS, {
    variables: {
      title,
    },
  });
  const [isFinished, setIsFinished] = useState(false);

  const onLoadMore = useCallback(
    (cursor: string) => {
      fetchMore({
        variables: {
          title,
          // @ts-ignore
          cursor,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          if (fetchMoreResult.ListPosts.posts.length === 0) {
            setIsFinished(true);
          }
          return {
            ListPosts: {
              ...prev.ListPosts,
              posts: [
                ...prev.ListPosts.posts,
                ...fetchMoreResult.ListPosts.posts,
              ],
            },
          };
        },
      });
    },
    [fetchMore, title]
  );

  const cursor = data?.ListPosts?.posts[data.ListPosts.posts.length - 1]?.id;

  useScroll({
    cursor,
    onLoadMore,
  });

  return { data, loading, error, isFinished };
};

export default useTitle;
