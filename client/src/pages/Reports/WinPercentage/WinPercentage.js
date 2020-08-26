import React, {useEffect, useState} from 'react';
import { gql } from 'apollo-boost';
import { useApolloClient, useQuery } from '@apollo/react-hooks';
import { ResponsiveBar } from '@nivo/bar'
import faTrophy from '@fortawesome/fontawesome-free-solid/faTrophy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Layout from '../../../components/Layout';
import { getWinPercentageForPlayer, getTotalSelectionsForPlayer } from '../../../utils/calculations';
import LoadingSpinner from "../../../components/LoadingSpinner";
import Error from "../../../components/Error";
import {makeStyles} from "@material-ui/core/styles";

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
                name
            }
            totalSelections
            winningSelections
            selectionCostWin
        }
    }
`;

const useStyles = makeStyles({
  bestPlayerStat: {
    marginTop: '24px'
  },
  statString: {
    marginLeft: '6px',
    fontSize: '1rem'
  },
  barContainer: {
    height: '500px'
  }
});

const ragColors = [
  '#A50126',
  '#D73026',
  '#F46D43',
  '#FDAD61',
  '#FEE08A',
  '#FEFFBF',
  '#E7F498',
  '#A6D96A',
  '#65BD63',
  '#19994F',
  '#006837'
];

const formatSelectionData = selections => {
  const totalSelections = getTotalSelectionsForPlayer(selections);
  const winPercentage = getWinPercentageForPlayer(selections, totalSelections, false);
  return { player: selections[0].user.name, percentage: winPercentage }
}

const WinPercentage = () => {
  const classes = useStyles();
  const client = useApolloClient();
  const [bars, setBars] = useState([]);
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
        setBars(selections);
      });
    }
  }, [playersData, client]);

  const displayBestPlayerAndScore = () => {
    const scores = bars.map(bar => bar.percentage);
    const bestScore = Math.max(...scores);
    const bestPlayers = bars.filter(bar => parseInt(bar.percentage) === bestScore);
    let string = '';
    bestPlayers.forEach((player, index) => {
      if (index > 0) string += ' and ';
      string += player.player;
    })
    if (bestPlayers.length > 1) string += ' are ';
    else string += ' is ';
    string += `smashing it with ${bestPlayers[0].percentage}%`;
    return string;
  }

  if (loading || !bars.length > 0) return <LoadingSpinner />;
  if (error) return <Error />;
  return (
    <Layout breadcrumbs={[
      { text: 'Reports', href: '/reports', active: false },
      { text: 'Win Percentage', href: '/reports/win-percentage', active: true }
    ]}>
      <div className={classes.bestPlayerStat}>
        <FontAwesomeIcon icon={faTrophy}size="lg" />
        <span className={classes.statString}>{displayBestPlayerAndScore()}</span>
      </div>
      <div className={classes.barContainer}>
        <ResponsiveBar
          data={bars}
          keys={[ 'percentage' ]}
          indexBy="player"
          margin={{ top: 50, right: 0, bottom: 50, left: 30 }}
          minValue={0}
          maxValue={100}
          padding={0.3}
          colors = {bars.map(({ percentage }) => {
            const colorIndex = Math.ceil(percentage / ragColors.length);
            return ragColors[colorIndex];
          })}
          colorBy="index"
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
          enableLabel={false}
          animate={true}
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
          motionStiffness={90}
          motionDamping={15}
        />
      </div>
    </Layout>
  );
};

export default WinPercentage;
