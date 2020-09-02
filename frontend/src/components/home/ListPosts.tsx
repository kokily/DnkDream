import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { shadow, media } from 'styles';
import Search from './Search';
import formatDate from 'utils/date';

export interface PostResponse {
  id: string;
  title: string;
  body: string;
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
  return (
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
      <Thumbnail>
        <img src="/profile.jpg" alt="" />
      </Thumbnail>

      <h2>{post.title}</h2>
      <div className="excerpt">
        <p>{post.body}</p>
      </div>
      <div className="byline">{formatDate(post.createdAt)} 작성</div>

      <Avatar>
        <img src="/profile.jpg" className="avatar" alt="" />
      </Avatar>
    </PostCardBlock>
  );
};

export default ListPosts;

// Styling
const Container = styled.div`
  overflow: hidden;
  background: white;
  box-sizing: border-box;
  width: 95%;
  margin: 2em auto;
  padding: 1em 5%;

  ${media.phone} {
    margin: 0 auto;
    padding: 1rem 0;
  }

  h2 {
    color: ${oc.cyan[9]};
    font-size: 1.25em;
    font-weight: bold;
    margin-bottom: 1em;

    ${media.phone} {
      font-size: 0.95em;
    }
  }

  p {
    margin-bottom: 1em;
    line-height: 1.5;
  }
`;

const PostListBlock = styled.ul`
  margin: 0 auto 1em;
  padding: 0;
`;

const PostCardBlock = styled.li`
  padding: 0.5em;
  display: block;
  clear: float;
  overflow: hidden;
  margin: 0 auto 2em;
  ${shadow(1)};
  cursor: pointer;

  h2,
  .excerpt,
  .byline {
    width: 65%;
    float: right;
  }

  .byline {
    color: ${oc.gray[5]};
  }

  ${media.tablet} {
    .excerpt {
      display: none;
    }
  }

  &:hover {
    ${shadow(3)};
  }
`;

const Thumbnail = styled.div`
  margin-bottom: 1em;
  width: 30%;
  margin: 0 5% 0 0;
  float: left;

  img {
    width: 100%;
  }
`;

const Avatar = styled.div`
  width: 78px;
  height: 78px;
  ${media.tablet} {
    width: 50px;
    height: 50px;
  }
  z-index: 9;
  position: relative;
  top: -12px;
  left: -12px;
  right: 0px;
  border: 4px solid #fff;
  background: #000;
  background-size: cover;
  border-radius: 50%;
  .avatar {
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    border-radius: 50%;
    ${shadow(1)};
  }
`;
