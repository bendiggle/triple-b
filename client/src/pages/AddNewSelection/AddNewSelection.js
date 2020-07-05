import React, {useEffect, useState} from 'react';
import {useMutation, useQuery} from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Button } from '@material-ui/core';
import Layout from '../../components/Layout';
import AddSelectionInfo from './components/AddSelectionInfo';
import AddBetInfo from "./components/AddBetInfo";
import LoadingSpinner from "../../components/LoadingSpinner";
import Error from "../../components/Error";
import AddDate from "./components/AddDate";

const GET_PLAYERS = gql`
    query {
        allUsers {
            id
            name
        }
    }
`;

const CREATE_SELECTION = gql`
    mutation createSelection($userId: ID!, $selectionDate: String!, $totalSelections: Int!,
        $winningSelections: Int!, $totalBets: Int!, $winningBets: Int!, $selectionCostWin: Boolean!
    ) {
        createSelection(userId: $userId, selectionDate: $selectionDate,
            totalSelections: $totalSelections, winningSelections: $winningSelections,
            totalBets: $totalBets, winningBets: $winningBets, selectionCostWin: $selectionCostWin
        ) {
            selectionDate,
            totalSelections
            winningSelections
            totalBets
            winningBets
            selectionCostWin
        }
    }
`;

const getDefaultValues = players => {
  const defaultValues = {
    date: new Date(),
    selections: [],
    totalBets: 0,
    winningBets: 0,
    selectionCostWin: null
  };
  defaultValues.selections = players.map(player => ({
    userId: player.id,
    totalSelections: 0,
    winningSelections: 0
  }));
  return defaultValues;
};


const sections = [
  props => <AddDate {...props} />,
  props => <AddSelectionInfo {...props} />,
  props => <AddBetInfo {...props} />
];

const AddNewSelection = () => {
  const { data: players, loading, error } = useQuery(GET_PLAYERS);
  const [createSelection] = useMutation(CREATE_SELECTION);
  const [sectionNumber, setSectionNumber] = useState(0);
  const [selectionValues, setSelectionValues] = useState(null);
  const Section = sections[sectionNumber];

  useEffect(() => {
    if (players) setSelectionValues(getDefaultValues(players.allUsers));
  }, [players])

  const submit = async () => {
    const { date, selections, totalBets, winningBets, selectionCostWin } = selectionValues;
    const validSelections = selections.filter(selection => selection.totalSelections > 0);
    const promises = validSelections.map(selection => createSelection({ variables: {
        userId: parseInt(selection.userId),
        selectionDate: date,
        totalSelections: parseInt(selection.totalSelections),
        winningSelections: parseInt(selection.winningSelections),
        totalBets: parseInt(totalBets),
        winningBets: parseInt(winningBets),
        selectionCostWin: parseInt(selectionCostWin) === parseInt(selection.userId)
      } }));
    try {
      await Promise.all(promises);
    } catch (err) {
      console.error(err);
    }
  }

  if (loading) return <LoadingSpinner />;
  if (error) return <Error />;
  return (
    <Layout header="Add New">
      <Section setFieldValue={setSelectionValues} values={selectionValues} players={players.allUsers} />
      <div>
        {sectionNumber > 0 && (
          <Button
            color="secondary"
            style={{ float: 'left' }}
            onClick={() => setSectionNumber(sectionNumber - 1)}
          >
            Previous
          </Button>
        )}
        {sectionNumber < sections.length - 1 ? (
          <Button
            color="primary"
            style={{ float: 'right' }}
            onClick={() => setSectionNumber(sectionNumber + 1)}
          >
            Next
          </Button>
        ) : (
          <Button
            style={{ float: 'right' }}
            color="primary"
            type="submit"
            onClick={() => submit()}
          >
            Submit
          </Button>
        )}
      </div>
    </Layout>
  );
};

export default AddNewSelection;