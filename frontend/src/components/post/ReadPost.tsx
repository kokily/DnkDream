import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import htmlParser from 'react-html-parser';
import PageTemplate from 'components/common/PageTemplate';
import { PostResponse } from 'components/home/ListPosts';
import formatDate from 'utils/date';

const ReadPost = ({
  post,
  PostButton,
}: {
  post: PostResponse;
  PostButton: React.ReactNode;
}) => {
  return (
    <PageTemplate>
      <PostBlock>
        <PostHeader>
          <h1>{post.title}</h1>
          <p>{formatDate(post.createdAt)}</p>
          {PostButton}
        </PostHeader>

        <GradientBorder />

        <Content className="content">{htmlParser(post.body)}</Content>
      </PostBlock>
    </PageTemplate>
  );
};

export default ReadPost;

// Styling
const PostBlock = styled.div`
  margin-top: 4rem;
`;

const PostHeader = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 1rem;
  h1 {
    font-size: 2.25rem;
    line-height: 1.5;
    margin: 0;
    color: ${oc.cyan[9]};
  }
  p {
    color: ${oc.gray[6]};
  }
`;

const GradientBorder = styled.div`
  height: 3px;
  background: linear-gradient(to right, ${oc.teal[6]}, ${oc.cyan[5]});
`;

const Content = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding: 1rem 1rem;
  margin-top: 1rem;
  font-size: 1.125rem;
  color: ${oc.gray[8]};

  img {
    width: 100%;
  }
`;
