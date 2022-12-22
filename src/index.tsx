import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from './redux/store';
import { InMemoryCache, ApolloProvider, ApolloClient, createHttpLink, } from '@apollo/client/';
import { setContext } from '@apollo/client/link/context';
import { HelmetProvider } from "react-helmet-async";

// graphql authentication setup
// http://localhost:4000/
// https://store-management-server-api.up.railway.app/
const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});
const authLink = setContext((_, { headers }) => {
  const token = JSON.parse(localStorage.getItem('accessToken') as string);
  return {
    headers: {
      ...headers,
      authorization: token ? token : "",
    }
  }
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});




// react app setup
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <HelmetProvider>
    <React.StrictMode>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </ApolloProvider>
    </React.StrictMode>
  </HelmetProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
