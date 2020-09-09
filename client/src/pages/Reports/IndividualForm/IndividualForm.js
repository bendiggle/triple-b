import React from 'react';
import { gql } from 'apollo-boost';

const GET_ALL_SELECTIONS = gql`
    query {
        allSelections {
            id
            user {
                id
                name
            }
            selectionDate
            totalSelections
            winningSelections
        }
    }
`;

const IndividualForm = () => {

};

export default IndividualForm;
