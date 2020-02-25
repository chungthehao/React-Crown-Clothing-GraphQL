import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http'; // let us connect our client to our "/graphql" endpoint
import { InMemoryCache } from 'apollo-cache-inmemory'; // Apollo uses to cache the data that it fetches
import { ApolloClient, gql } from 'apollo-boost';

import { store, persistor } from './redux/store';

import './index.css';
import App from './App';

// Establish the connection to our backend
const httpLink = createHttpLink({
  uri: 'https://crwn-clothing.com'
});

// Object lưu các data
const cache = new InMemoryCache();

// Client
const client = new ApolloClient({
  link: httpLink,
  cache
});

// query trả về 1 promise
client.query({
  query: gql`
    {
      getCollectionsByTitle(title: "hats") {
        id
        title
        items {
          id
          name
          price
          imageUrl
        }
      }
    }
  `
}).then(res => console.log(res));

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);
