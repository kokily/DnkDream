import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import client from 'client';
import App from 'App';

ReactDOM.render(
  <ApolloProvider client={client}>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </ApolloProvider>,
  document.getElementById('root') as HTMLElement
);
