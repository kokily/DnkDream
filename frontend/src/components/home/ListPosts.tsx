import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { shadow, media } from 'styles';
import Search from './Search';
import formatDate from 'utils/date';
import Meta, { MetaProps } from 'components/common/Meta';

export interface PostResponse {
  id: string;
  title: string;
  body: string;
  thumbnail?: string;
  createdAt: string;
  updatedAt?: string;
}

interface ListPostsProps {
  posts: PostResponse[] | null;
  search: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onPost: (id: string) => void;
}

const ListPosts: React.FC<ListPostsProps> = ({
  posts,
  search,
  onChange,
  onSearch,
  onKeyPress,
  onPost,
}) => {
  const metaData: MetaProps = {
    titleData: '포스트 리스트 - D&K Dreams Blog',
    descriptionData: '포스트 리스트, 포스트, Post List, Posts, 블로그',
  };

  return (
    <>
      <Meta {...metaData} />
      <Container>
        <Search
          mode="포스트"
          search={search}
          onChange={onChange}
          onSearch={onSearch}
          onKeyPress={onKeyPress}
        />
        <PostListBlock>
          {posts === null || posts.length === 0 ? (
            <div>포스트가 존재하지 않습니다.</div>
          ) : (
            <>
              {posts.map((post) => (
                <PostItem key={post.id} post={post} onPost={onPost} />
              ))}
            </>
          )}
        </PostListBlock>
      </Container>
    </>
  );
};

const PostItem = ({
  post,
  onPost,
}: {
  post: PostResponse;
  onPost: (id: string) => void;
}) => {
  return (
    <PostCardBlock onClick={() => onPost(post.id)}>
      <img
        className="thumbnail"
        src={post.thumbnail !== '' ? post.thumbnail : '/thumbnail.png'}
        alt=""
      />

      <TitlePane>{post.title}</TitlePane>
      <div className="byline">{formatDate(post.createdAt)} 작성</div>
      <div className="copyright">D&K Dreams Blog</div>

      <Avatar>
        <img src="/profile.jpg" className="avatar" alt="" />
      </Avatar>
    </PostCardBlock>
  );
};

export default ListPosts;

// Styling
const Container = styled.div`
  background: white;
  margin-top: 4.2rem;
`;

const PostListBlock = styled.ul`
  margin-top: 1rem;
  margin-left: 1rem;
  margin-right: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
  padding: 0;
`;

const PostCardBlock = styled.li`
  background: white;
  border-radius: 5px;
  ${shadow(1)};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: all 0.2s;
  cursor: pointer;

  .thumbnail {
    width: 100%;
    height: 200px;
  }

  .byline {
    margin-top: 1.2rem;
    margin-right: 1.4rem;
    margin-bottom: 0;
    text-align: right;
    color: ${oc.gray[5]};
  }

  .copyright {
    margin: 1rem 1.4rem 0 0;
    padding: 0;
    text-align: right;
    position: relative;
    top: 40px;
    font-size: 1.2rem;
    font-weight: 600;
    color: ${oc.cyan[9]};
    text-shadow: 2px 2px rgba(0, 0, 0, 0.1);
  }

  &:hover {
    ${shadow(2)};
  }
`;

const TitlePane = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #666;
  transition: all 0.5s;
  overflow: hidden;
  padding: 20px 25px;

  ${media.tablet} {
    padding: 0;
  }
  background: ${oc.gray[0]};
  margin: -15px 20px 20px;
  position: relative;
  z-index: 4;
  color: ${oc.cyan[9]};
  ${shadow(1)};

  &:hover {
    color: ${oc.teal[9]};
    text-shadow: 2px 2px rgba(0, 0, 0, 0.1);
  }
`;

const Avatar = styled.div`
  width: 78px;
  height: 78px;
  z-index: 9;
  position: relative;
  top: -66px;
  left: 30px;
  right: 0px;
  border: 4px solid #fff;
  background: #000;
  background-size: cover;
  border-radius: 50%;
  margin: 0;
  padding: 0;
  .avatar {
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    border-radius: 50%;
    ${shadow(2)};
  }
`;
