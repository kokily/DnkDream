import React from 'react';
import { hydrate, render } from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import client from 'client';
import App from 'App';
import 'react-toastify/dist/ReactToastify.css';

const rootElement = document.getElementById('root') as HTMLElement;

if (rootElement.hasChildNodes()) {
  hydrate(
    <ApolloProvider client={client}>
      <HelmetProvider>
        <BrowserRouter>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </BrowserRouter>
      </HelmetProvider>
    </ApolloProvider>,
    rootElement
  );
} else {
  render(
    <ApolloProvider client={client}>
      <HelmetProvider>
        <BrowserRouter>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </BrowserRouter>
      </HelmetProvider>
    </ApolloProvider>,
    rootElement
  );
}
