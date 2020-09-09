import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import moment from 'moment';
import { ResponsiveLine } from '@nivo/line';
import Layout from '../../../components/Layout';
import LoadingSpinner from '../../../components/LoadingSpinner';
import Error from '../../../components/Error';
import groupBy from '../../../utils/groupBy';

const GET_ALL_SELECTIONS = gql`
    query {
        allSelections {
            id
            selectionDate
            totalSelections
            winningSelections
        }
    }
`;

const useStyles = makeStyles({
  lineContainer: {
    height: '500px'
  }
});

const formatData = (selections) => {
  const data = {
    id: 'teamForm',
    data: Object.keys(selections).map(selection => {
      const x = moment(selection).format('DD/MM');
      const totalSelections = selections[selection]
        .map(s => s.totalSelections)
        .reduce((a, b) => a + b);
      const winningSelections = selections[selection]
        .map(s => s.winningSelections)
        .reduce((a, b) => a + b);
      const y = (winningSelections / totalSelections) * 100;
      return { x, y };
    })
  };
  return [data];
}

const TeamForm = () => {
  const theme = useTheme();
  const classes = useStyles();
  const { data: selectionsData, loading, error } = useQuery(GET_ALL_SELECTIONS);
  if (loading) return <LoadingSpinner />;
  if (error) return <Error />;
  const groupBySelectionDate = groupBy('selectionDate');
  const groupedData = groupBySelectionDate(selectionsData.allSelections);
  const lines = formatData(groupedData);
  return (
    <Layout
      breadcrumbs={[
        { text: 'Reports', href: '/reports', active: false },
        { text: 'Team Form', href: '/reports/team-form', active: true }
      ]}
    >
      <div className={classes.lineContainer}>
        <ResponsiveLine
          height={400}
          margin={{ top: 50, right: 15, bottom: 50, left: 30 }}
          animate={true}
          enableSlices="x"
          data={lines}
          curve="monotoneX"
          yScale={{
            type: 'linear',
            min: 0,
            max: 100
          }}
          axisBottom={{
            tickSize: 0,
            tickPadding: 5,
            tickRotation: 0
          }}
          axisLeft={{
            tickSize: 0,
            tickPadding: 5,
            tickRotation: 0
          }}
          colors={[theme.palette.secondary.main]}
          theme={{
            axis: {
              ticks: {
                line: {
                  stroke: 'white'
                },
                text: {
                  fill: 'white'
                }
              }
            }
          }}
        />
      </div>
    </Layout>
  )
};

export default TeamForm;