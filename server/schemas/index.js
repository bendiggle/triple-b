const { gql } = require('apollo-server');

const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        nickName: String
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
        selectionsByUser(userId: ID!): [Selection!]!
    }

    type Mutation {
        createUser(name: String!, nickName: String): User!
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