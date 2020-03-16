const { gql } = require('apollo-server');

const typeDefs = gql`
    type User {
        id: Int!
        name: String!
        selection: [Selection!]!
    }

    type Selection {
        id: Int!
        selectionDate: String!
        totalSelections: Int!
        winningSelections: Int!
        totalBets: Int!
        winningBets: Int!
        selectionCostWin: Int!
        user: User!
    }

    type Query {
        user(id: Int!): User
        allUsers: [User!]!
        allSelections: [Selection!]!
        selection(id: Int!): Selection
    }

    type Mutation {
        createUser(name: String!): User!
        createSelection(
            userId: Int!
            selectionDate: String!
            totalSelections: Int!
            winningSelections: Int!
            totalBets: Int!
            winningBets: Int!
            selectionCostWin: Int!
        ): Selection!
    }
`;

module.exports = typeDefs;