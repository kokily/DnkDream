import { gql } from 'apollo-boost';

// Query
export const LIST_POSTS = gql`
  query ListPosts($cursor: ID, $title: String) {
    ListPosts(cursor: $cursor, title: $title) {
      ok
      error
      posts {
        id
        title
        body
        thumbnail
        createdAt
        updatedAt
      }
    }
  }
`;

export const READ_POST = gql`
  query ReadPost($id: ID!) {
    ReadPost(id: $id) {
      ok
      error
      post {
        id
        title
        body
        thumbnail
        createdAt
        updatedAt
      }
    }
  }
`;

// Mutation
export const ADD_POST = gql`
  mutation AddPost($title: String!, $body: String!, $thumbnail: String) {
    AddPost(title: $title, body: $body, thumbnail: $thumbnail) {
      ok
      error
      post {
        id
        title
        body
        thumbnail
        createdAt
        updatedAt
      }
    }
  }
`;

export const REMOVE_POST = gql`
  mutation RemovePost($id: ID!) {
    RemovePost(id: $id) {
      ok
      error
    }
  }
`;

export const UPDATE_POST = gql`
  mutation UpdatePost($id: ID!, $title: String, $body: String, $thumbnail: String) {
    UpdatePost(id: $id, title: $title, body: $body, thumbnail: $thumbnail) {
      ok
      error
      post {
        id
        title
        body
        createdAt
        updatedAt
      }
    }
  }
`;
