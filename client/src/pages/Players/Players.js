import React from 'react';
import { useQuery } from '@apollo/react-hooks';
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

const headers = [
  'Player',
  'Selections',
  'Win %',
  'Let down'
];

const createRows = players => players.map(player => ({
  id: player.id,
  name: player.name,
  totalSelections: 22,
  winPercentage: 59,
  lostByOne: 3
}));

const Players = () => {
  const { data, loading, error } = useQuery(GET_PLAYERS);
  if (loading) return <LoadingSpinner />;
  if (error) return <Error />;
  const rows = createRows(data.allUsers);
  return (
    <Layout header="Players">
      <Table>
        <TableHead>
          <TableRow>
            {headers.map(header => <TableCell key={header}>{header}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(data => (
            <TableRow key={data.id}>
              <TableCell>{data.name}</TableCell>
              <TableCell>{data.totalSelections}</TableCell>
              <TableCell>{data.winPercentage}</TableCell>
              <TableCell>{data.lostByOne}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Layout>
  )
};

export default Players;