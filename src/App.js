import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { createTheme, ThemeProvider } from '@mui/material';
import { yellow, pink } from '@mui/material/colors';
import Box from '@mui/material/Box'

import Routes from './routes';

import AppHeader from './layouts/AppHeader'
import AppFooter from './layouts/AppFooter'
import './App.css';

const browserHistory = createBrowserHistory();

const customTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: yellow[500]
    },
    secondary: {
      main: pink[500]
    }
  }
})
export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={customTheme}>
        <Router history={browserHistory}>
          <Box
            sx={{
              minHeight: "100vh", // 100% da altura da área de exibição
              marginBottom: "40px",
              backgroundColor: customTheme.palette.background.default,
              color: customTheme.palette.text.primary,
            }}
          >
            <AppHeader />
            <Box component="main" sx={{ margin: "20px" }}>
              <Routes />
            </Box>
            <AppFooter />
          </Box>
        </Router>

      </ThemeProvider>
    );
  }
}