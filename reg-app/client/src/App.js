import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registration from './registration';
import Login from './login';
import Home from './home';
import Form from './form';
import './registration.css';
import { ApolloProvider, ApolloClient, InMemoryCache, gql, useMutation, useQuery } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/form" element={<Form/>} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
};

export default App;
