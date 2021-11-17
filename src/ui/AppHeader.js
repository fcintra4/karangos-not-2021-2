import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import logo from '../assets/karangos-logo-300px.png'
import MainMenu from './MainMenu'

export default function AppHeader() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" enableColorOnDark>
        <Toolbar>
          
          <MainMenu />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <a href="App.js">
            <img src={logo} alt="Logotipo Karangos" />
            </a>
          </Typography>
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}