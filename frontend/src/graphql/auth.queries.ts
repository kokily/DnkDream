import { gql } from 'apollo-boost';

// Query
export const CHECK_USER = gql`
  query CheckUser {
    CheckUser {
      ok
      error
      user {
        id
        username
        admin
        createdAt
      }
    }
  }
`;

// Mutation
export const LOGIN_USER = gql`
  mutation LoginUser($username: String!, $password: String!) {
    LoginUser(username: $username, password: $password) {
      ok
      error
      token
    }
  }
`;

export const REGISTER_USER = gql`
  mutation RegisterUser($username: String!, $password: String!) {
    RegisterUser(username: $username, password: $password) {
      ok
      error
    }
  }
`;

export const SUCEDE_USER = gql`
  mutation SucedeUser {
    SucedeUser {
      ok
      error
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($password: String!) {
    UpdateUser(password: $password) {
      ok
      error
      user {
        id
        username
        adminc
        createdAt
      }
    }
  }
`;
