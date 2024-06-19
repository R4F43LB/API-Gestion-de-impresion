// by Rafael Balestrini 25/11/2020
// GraphQL server to allow a customer to request license printing and check the
// status of the request

const express = require('express');
const {ApolloServer} = require('apollo-server-express');
require('dotenv').config();
const jwt = require('jsonwebtoken');

// Local module imports
const db = require('./db'); //Database connect setup
const models = require('./models'); //MongoDB schema
const typeDefs = require('./schema'); //GraphQL schema
const resolvers = require('./resolvers'); //GraphQL implementation

// Run the server on a port specified in our .env file or port 4000
const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST; //comes from the .env file

const app = express();

db.connect(DB_HOST); //Database connection

// Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({req}) => {
    const token = req.headers.authorization; // get the user token from the headers
    const user = getUser(token); // try to retrieve a user with the token
    console.log(user); // for now, let's log the user to the console
    return {models, user}; // add the db models and the user to the context
  }
});

// Apply the Apollo GraphQL middleware and set the path to /api
server.applyMiddleware({app, path: '/api'});

app.listen(port, () =>
  console.log(`GraphQL Server running at http://localhost:${port}${server.graphqlPath}`));

// get the user info from a JWT
const getUser = token => {
  if (token)
  {
    try
    {
      // return the user information from the token
      return jwt.verify(token, process.env.JWT_SECRET);
    }
     catch (err)
     {
       // if there's a problem with the token, throw an error
       throw new Error('Session invalid');
     }
  }
};
