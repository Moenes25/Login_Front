import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie'
import Login from './components/LoginPage';
import { ApolloProvider } from "react-apollo";
import { HttpLink } from "apollo-link-http";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from 'apollo-link-context';
import * as serviceWorker from './serviceWorker';



const endPoint = new HttpLink({
  uri: "http://localhost:4000/graphql",
  credentials:  "include"
});
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = Cookies.get("USER");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      
    }
  }
});

  const client = new ApolloClient({
    link: authLink.concat(endPoint),
    cache: new InMemoryCache()
  });

ReactDOM.render(
<ApolloProvider client={client}>
<Login />
</ApolloProvider>, document.getElementById('root'));


serviceWorker.unregister();
