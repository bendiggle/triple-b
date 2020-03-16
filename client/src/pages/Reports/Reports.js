import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import faTrophy from '@fortawesome/fontawesome-free-solid/faTrophy';
import { faMedal } from '@fortawesome/free-solid-svg-icons/faMedal';
import faUser from '@fortawesome/fontawesome-free-solid/faUser';
import faUserFriends from '@fortawesome/fontawesome-free-solid/faUserFriends';
import faThumbsDown from '@fortawesome/fontawesome-free-solid/faThumbsDown';
import faChevronRight from '@fortawesome/fontawesome-free-solid/faChevronRight';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Layout from '../../components/Layout';

const ListIcon = styled(ListItemIcon)({
  display: 'flex',
  justifyContent: 'flex-end'
});

const reportItems = [
  {
    text: 'Win Percentage',
    icon: <FontAwesomeIcon icon={faTrophy} />,
    toPath: '/reports/win-percentage'
  },
  {
    text: 'Perfect Selections',
    icon: <FontAwesomeIcon icon={faMedal} />,
    toPath: '/reports/perfect-selections'
  },
  {
    text: 'Individual Form',
    icon: <FontAwesomeIcon icon={faUser} />,
    toPath: '/reports/individual-form'
  },
  {
    text: 'Team Form',
    icon: <FontAwesomeIcon icon={faUserFriends} />,
    toPath: '/reports/team-form'
  },
  {
    text: 'Bets lost by one',
    icon: <FontAwesomeIcon icon={faThumbsDown} />,
    toPath: '/reports/lost-by-one'
  }
];

const Reports = () => {
  return (
    <Layout header="Reports">
      <List component="nav">
        {reportItems.map(item => (
          <ListItem button component={props => <Link to={item.toPath} {...props} />}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
            <ListIcon><FontAwesomeIcon icon={faChevronRight}/></ListIcon>
          </ListItem>
        ))}
      </List>
    </Layout>
  );
};

export default Reports;
