import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
  spinner: {
    position: 'absolute',
    top: 'calc(50% - 20px)',
    left: 'calc(50% - 20px)'
  }
});

const LoadingSpinner = () => {
  const classes = useStyles();
  return (
    <CircularProgress className={classes.spinner} color="secondary" />
  );
};

export default LoadingSpinner;
