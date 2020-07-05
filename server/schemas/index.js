const { gql } = require('apollo-server');

const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        selection: [Selection!]!
    }

    type Selection {
        id: ID!
        selectionDate: String!
        totalSelections: Int!
        winningSelections: Int!
        totalBets: Int!
        winningBets: Int!
        selectionCostWin: Boolean!
        user: User!
    }

    type Query {
        user(id: ID!): User
        allUsers: [User!]!
        allSelections: [Selection!]!
        selection(id: ID!): Selection
    }

    type Mutation {
        createUser(name: String!): User!
        createSelection(
            userId: ID!
            selectionDate: String!
            totalSelections: Int!
            winningSelections: Int!
            totalBets: Int!
            winningBets: Int!
            selectionCostWin: Boolean!
        ): Selection!
    }
`;

module.exports = typeDefs;