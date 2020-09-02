import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import ListPostsContainer from 'containers/home/ListPostsContainer';

const ListPostsPage = () => {
  return (
    <PageTemplate>
      <ListPostsContainer />
    </PageTemplate>
  );
};

export default ListPostsPage;
