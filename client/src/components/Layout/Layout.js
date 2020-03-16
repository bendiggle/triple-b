import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { AppBar, Typography } from '@material-ui/core';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { makeStyles, styled } from '@material-ui/core/styles';
import faChartPie from '@fortawesome/fontawesome-free-solid/faChartPie';
import faPlusCircle from '@fortawesome/fontawesome-free-solid/faPlusCircle';
import faUsers from '@fortawesome/fontawesome-free-solid/faUsers';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Container from '@material-ui/core/Container';
import CircularProgress from "@material-ui/core/CircularProgress";

const Icon = styled(FontAwesomeIcon)({
  fontSize: '24px',
  color: 'white'
});

const useStyles = makeStyles({
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
  loadingSpinner: {
    position: 'absolute',
    top: 'calc(50% - 20px)',
    left: 'calc(50% - 20px)'
  }
});

const navItems = [
  { label: 'Add Selections', value: '/add-new-selections', icon: <Icon icon={faPlusCircle} />},
  { label: 'Players', value: '/players', icon: <Icon icon={faUsers} />},
  { label: 'Reports', value: '/reports', icon: <Icon icon={faChartPie} />},
];

const Layout = ({ header, children, loading, error }) => {
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();
  const renderChildren = () => {
    if (loading) return <CircularProgress className={classes.loadingSpinner} color="secondary" />;
    if (error) return <div>Error</div>;
    return children;
  };
  return (
    <div>
      <AppBar className={classes.header} position="static">
        <Typography variant="h1">Triple-B</Typography>
      </AppBar>
      <Container className={classes.mainContent}>
        <Typography variant="h2" className={classes.pageHeading}>{header}</Typography>
        {renderChildren()}
      </Container>
      <div>
        <BottomNavigation
          value={location.pathname}
          className={classes.navigation}
          onChange={(e, value) => history.push(value)}
        >
          {navItems.map(item => (
            <BottomNavigationAction
              label={item.label}
              value={item.value}
              icon={item.icon}
              showLabel={false}
            />
          ))}
        </BottomNavigation>
      </div>
    </div>
  );
};

export default Layout;
