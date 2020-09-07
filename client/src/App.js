import React from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import Routes from './routes';

const BACKEND_URL = process.env.BACKEND_URL || 'https://triple-b-server.herokuapp.com'

console.log(BACKEND_URL);

const client = new ApolloClient({
  uri: `${BACKEND_URL}/graphql`,
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
