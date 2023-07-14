const express=require('express')
const { ApolloServer, gql } = require('apollo-server-express');
const { Pool } = require('pg');


const app = express();

const pool = new Pool({
    user: 'reg_app',
    host: 'localhost',
    database: 'registration',
    password: '123',
    port: 5432, // Default PostgreSQL port
  });
  
  
  const typeDefs = gql`
    type User {
      username: String!
      password: String!
      day: String!
      month: String!
      year: String!
      gender: String!
    }
  
    type Query {
      user1: [User!]!
    }

    type Mutation {
      createUser(
        username: String!
        password: String!
        day: String!
        month: String!
        year: String!
        gender: String!
      ): User!
    }
  `;
  
  
  const resolvers = {
    Query: {
      user1: async () => {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM user1');
        client.release();
  
        return result.rows;
      },
    },
    Mutation: {
      createUser: async (_, { username, password, day, month, year, gender }) => {
        const client = await pool.connect();
        const result = await client.query(
          'INSERT INTO user1 (username, password, day, month, year, gender) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
          [username, password, day, month, year, gender]
        );
        client.release();
    
        return result.rows[0];
      },
    },
  };
  
  
  const startServer = async () => {
    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();
    const app = express();
    server.applyMiddleware({ app });
    const port = 4000;
    app.listen({ port }, () => {
      console.log(`Server running at http://localhost:${port}${server.graphqlPath}`);
    });
  };
  
  startServer().catch((err) => console.error('Error starting server:', err));
  