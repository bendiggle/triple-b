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
  context: { models },
  debug: true
});

// models.sequelize.authenticate();
// models.sequelize.sync();

server
  .listen({ port: process.env.PORT || 4000 })
  .then(({ url }) => console.log(`🚀 Server is running on ${url}`));
