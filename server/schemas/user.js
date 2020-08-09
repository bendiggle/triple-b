const { gql } = require('apollo-server');

module.exports = gql`
    type User {
        id: ID!
        name: String!
        nickName: String
    }

    extend type Query {
        user(id: ID!, name: String!, nickName: String): User!
    }

    extend type Mutation {
        createUser(name: String!, nickName: String): User!
    }
`;
