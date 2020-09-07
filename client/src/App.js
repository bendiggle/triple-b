import React from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';
import { ApolloProvider } from '@apollo/react-hooks';
import Routes from './routes';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000'

const client = new ApolloClient({
  uri: `${BACKEND_URL}/graphql`,
  cache: new InMemoryCache(),
  fetchOptions: {
    mode: 'no-cors',
  }
});

const App = () => {
  const theme = createMuiTheme({
        palette: {
          type: 'dark',
          primary: {
            main: '#6200EE'
          },
          secondary: {
            main: '#03DAC5'
          },
          background: {
            default: '#212121'
          },
          contrastThreshold: 3,
          tonalOffset: 0.2
        }
      });
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes/>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
