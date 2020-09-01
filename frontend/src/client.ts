import { ApolloClient, InMemoryCache } from 'apollo-boost';
import { ApolloLink, Operation, concat } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { withClientState } from 'apollo-link-state';
import { toast } from 'react-toastify';

const { NODE_ENV } = process.env;

const getToken = () => {
  const token = localStorage.getItem('dnkdream_authenticate_token');

  if (token) {
    return token;
  } else {
    return '';
  }
};

const cache = new InMemoryCache();

const authMiddleware = new ApolloLink((operation: Operation, forward: any) => {
  operation.setContext({
    headers: {
      dnkdream_authenticate: getToken(),
    },
  });

  return forward(operation);
});

const httpLink = new HttpLink({
  uri:
    NODE_ENV === 'development'
      ? 'http://localhost:4000/graphql'
      : 'http://localhost:4000/graphql',
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message }) => {
      return toast.error(`${message}`);
    });
  }

  if (networkError) {
    toast.error(`네트워크 에러: ${networkError}`);
  }
});

const localStateLink = withClientState({
  cache,
  defaults: {
    auth: {
      __typename: 'Auth',
      isLoggedIn: Boolean(localStorage.getItem('dnkdream_authenticate_token')),
    },
  },
  resolvers: {
    Mutation: {
      logIn: (_, { token }, { cache: appCache }) => {
        localStorage.setItem('dnkdream_authenticate_token', token);

        appCache.writeData({
          data: {
            auth: {
              __typename: 'Auth',
              isLoggedIn: true,
            },
          },
        });

        return null;
      },
      logOut: (_, __, { cache: appCache }) => {
        localStorage.removeItem('dnkdream_authenticate_token');

        appCache.writeData({
          data: {
            auth: {
              __typename: 'Auth',
              isLoggedIn: false,
            },
          },
        });

        return null;
      },
    },
  },
});

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([
    errorLink,
    localStateLink,
    concat(authMiddleware, httpLink),
  ]),
});

export default client;
