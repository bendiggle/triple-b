import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { makeStyles, styled } from '@material-ui/core/styles';
import faChartPie from '@fortawesome/fontawesome-free-solid/faChartPie';
import faPlusCircle from '@fortawesome/fontawesome-free-solid/faPlusCircle';
import faUserCircle from '@fortawesome/fontawesome-free-solid/faUserCircle';
import faBell from '@fortawesome/fontawesome-free-solid/faBell';
import faUsers from '@fortawesome/fontawesome-free-solid/faUsers';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Container from '@material-ui/core/Container';

const Icon = styled(FontAwesomeIcon)({
  fontSize: '24px',
  color: 'inherit'
});

const useStyles = makeStyles({
  title: {
    width: '100%'
  },
  iconButtons: {
    display: 'flex'
  },
  pageHeading: {
    fontSize: '2.5rem'
  },
  navigation: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000
  },
  navigationAction : {
    paddingTop: '6px !important',
    color: 'white'
  }
});

const navItems = [
  { label: 'Add Selections', value: '/add-new-selections', icon: <Icon icon={faPlusCircle} />},
  { label: 'Players', value: '/players', icon: <Icon icon={faUsers} />},
  { label: 'Reports', value: '/reports', icon: <Icon icon={faChartPie} />},
];

const Layout = ({ header, children }) => {
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h5">Triple-B</Typography>
          <div className={classes.iconButtons}>
            <IconButton><Icon icon={faBell} size="lg"/></IconButton>
            <IconButton><Icon icon={faUserCircle}/></IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Container className={classes.mainContent}>
        <Typography variant="h2" className={classes.pageHeading}>{header}</Typography>
        {children}
      </Container>
      <div>
        <BottomNavigation
          value={location.pathname}
          className={classes.navigation}
          onChange={(e, value) => history.push(value)}
        >
          {navItems.map(item => (
            <BottomNavigationAction
              className={classes.navigationAction}
              value={item.value}
              icon={item.icon}
            />
          ))}
        </BottomNavigation>
      </div>
    </div>
  );
};

export default Layout;
