import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useTitle from 'hooks/useTitle';
import ListPosts from 'components/home/ListPosts';

const ListPostsContainer = () => {
  const history = useHistory();
  const [search, setSearch] = useState('');
  const [title, setTitle] = useState('');
  const { data, loading, error } = useTitle(title);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSearch = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (search === '') {
      return;
    } else {
      setTitle(search);
    }
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // @ts-ignore
      onSearch(e);
    }
  };

  const onPost = (id: string) => {
    history.push(`/post/${id}`);
  };

  useEffect(() => {
    return () => {
      setSearch('');
      setTitle('');
    };
  }, []);

  if (error) return null;
  if (loading) return null;

  return (
    <ListPosts
      posts={data?.ListPosts?.ok && data.ListPosts.posts}
      search={search}
      onChange={onChange}
      onSearch={onSearch}
      onKeyPress={onKeyPress}
      onPost={onPost}
    />
  );
};

export default ListPostsContainer;
