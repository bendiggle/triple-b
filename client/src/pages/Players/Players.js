import React, { useEffect, useState } from 'react';
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Layout from '../../components/Layout';
import LoadingSpinner from '../../components/LoadingSpinner'
import Error from '../../components/Error';

const GET_PLAYERS = gql`
    query {
        allUsers {
            id
            name
        }
    }
`;

const GET_SELECTIONS_BY_PLAYER = gql`
    query selectionsByUser($userId: ID!) {
        selectionsByUser(userId: $userId) {
            id
            user {
                id
                name
            }
            totalSelections
            winningSelections
            selectionCostWin
        }
    }
`;

const headers = [
  'Player',
  'Selections',
  'Win %',
  'Let down'
];

const getTotalSelectionsForPlayer = (selections) => {
  let totalSelections = 0;
  selections.forEach(selection => {
    totalSelections += selection.totalSelections;
  });
  return totalSelections;
};

const getWinPercentageForPlayer = (selections, totalSelections) => {
  let winningSelections = 0;
  selections.forEach(selection => {
    winningSelections += selection.winningSelections;
  });
  const percentage = (winningSelections / totalSelections) * 100;
  return `${percentage.toFixed(1)}%`;
}

const getTotalLetDowns = (selections) =>
  selections.filter(selection => selection.selectionCostWin).length

const formatSelectionData = (selections) => {
  const totalSelections = getTotalSelectionsForPlayer(selections);
  const winPercentage = getWinPercentageForPlayer(selections, totalSelections);
  const lostByOne = getTotalLetDowns(selections);
  return { ...selections[0].user, totalSelections, winPercentage, lostByOne };
}

const Players = () => {
  const client = useApolloClient();
  const [rows, setRows] = useState([]);
  const { data: playersData, loading, error } = useQuery(GET_PLAYERS);

  useEffect(() => {
    if (playersData) {
      const getSelectionByPlayer = async userId => {
        const { data: selectionData } = await client.query({
          query: GET_SELECTIONS_BY_PLAYER,
          variables: { userId },
        });
        return selectionData;
      }
      const promises = playersData.allUsers.map(player => getSelectionByPlayer(player.id));
      Promise.all(promises).then(values => {
        const selections = values.map(value => formatSelectionData(value.selectionsByUser));
        setRows(selections);
      });
    }
  }, [playersData, client]);


  if (loading || !rows.length > 0) return <LoadingSpinner />;
  if (error) return <Error />;
  return (
    <Layout header="Players">
      <Table>
        <TableHead>
          <TableRow>
            {headers.map(header => <TableCell key={header}>{header}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.totalSelections}</TableCell>
              <TableCell>{row.winPercentage}</TableCell>
              <TableCell>{row.lostByOne}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Layout>
  )
};

export default Players;