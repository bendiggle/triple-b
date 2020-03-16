const cors = require('cors');
const express = require('express');
const { ApolloServer } = require('apollo-server');

const typeDefs = require('./schemas');
const resolvers = require('./resolvers');
const models = require('./models');

const app = express();
app.use(cors());


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { models }
});

server
  .listen()
  .then(({ url }) => console.log(`🚀 Server is running on ${url}`));
