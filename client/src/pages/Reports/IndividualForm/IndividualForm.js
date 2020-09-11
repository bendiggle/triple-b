import React from 'react';
import { gql } from 'apollo-boost';
import Layout from "../../../components/Layout";
import {ResponsiveLine} from "@nivo/line";
import {makeStyles} from "@material-ui/core/styles";
import {useQuery} from "@apollo/react-hooks";
import LoadingSpinner from "../../../components/LoadingSpinner";
import Error from "../../../components/Error";
import groupBy from "../../../utils/groupBy";
import moment from 'moment';

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

const useStyles = makeStyles({
  averageFormStat: {
    marginTop: '24px'
  },
  statString: {
    marginLeft: '6px',
    fontSize: '1rem'
  },
  lineContainer: {
    height: '500px'
  }
});

const formatData = selections => {
  const playersForm = Object.keys(selections).map(playerId => ({
    id: playerId,
    data: selections[playerId].map(selection => {
      const x = moment(selection.selectionDate).format('DD/MM');
      const y = (selection.winningSelections / selection.totalSelections) * 100;
      return { x, y };
    })
  }))
  return playersForm;
};

// ADD COLORS
// ADD LEGEND
const IndividualForm = () => {
  const classes = useStyles();
  const { data: selectionsData, loading, error } = useQuery(GET_ALL_SELECTIONS);
  if (loading) return <LoadingSpinner />;
  if (error) return <Error />;
  const groupBySelectionDate = groupBy('userId');
  const flattenSelections = selectionsData.allSelections.map(selection =>
    ({ ...selection, userId: selection.user.id })
  );
  const groupedData = groupBySelectionDate(flattenSelections);
  const lines = formatData(groupedData)
  return (
    <Layout
      breadcrumbs={[
        { text: 'Reports', href: '/reports', active: false },
        { text: 'Individual Form', href: '/reports/individual-form', active: true }
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
          colors={['red']}
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

export default IndividualForm;
