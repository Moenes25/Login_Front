import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Cookies from 'js-cookie'
import Login from './LoginPage';
import { ApolloProvider } from "react-apollo";
import { HttpLink } from "apollo-link-http";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from 'apollo-link-context';
import {  ApolloLink } from 'apollo-boost';
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
      //authorization: token ? `Bearer ${token}` : "",
    }
  }
});
// const authLink = new ApolloLink((operation, forward) => {
//   // Retrieve the authorization token from local storage.
//   const token = localStorage.getItem('jwt');

//   // Use the setContext method to set the HTTP headers.
//   operation.setContext({
//     headers: {
//       authorization: token ? `Bearer ${token}` : ''
//     }
//   });

//   // Call the next link in the middleware chain.
//   return forward(operation);
// });
  const client = new ApolloClient({
    link: authLink.concat(endPoint),
    cache: new InMemoryCache()
  });

ReactDOM.render(
<ApolloProvider client={client}>
<Login />
</ApolloProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
