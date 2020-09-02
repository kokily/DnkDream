import { gql } from 'apollo-boost';

export const LOGIN_CONFIRM = gql`
  mutation logIn($token: String!) {
    logIn(token: $token) @client
  }
`;

export const LOG_OUT = gql`
  mutation logOut {
    logOut @client
  }
`;

export const IS_LOGGED_IN = gql`
  {
    auth {
      isLoggedIn @client
    }
  }
`;
