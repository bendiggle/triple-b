const { gql } = require('apollo-server');

module.exports = gql`
    type User {
        id: ID!
        name: String!
    }

    extend type Query {
        user(id: ID!, name: String!): User!
    }

    extend type Mutation {
        createUser(name: String!): User!
    }
`;
