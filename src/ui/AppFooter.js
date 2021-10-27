import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => ({
  box: {
    position: 'absolute',
    bottom: 0,
    width: '100%'
  },
  typog: {
    textAlign: 'center',
    width: '100%'
  },
  toolbar: {
    backgroundColor: theme.palette.background.paper
  }
}))

export default function AppFooter() {

  const classes = useStyles()

  return (
    <Box sx={{ flexGrow: 1 }} className={classes.box}>
      <AppBar position="static">
        <Toolbar variant="dense" component="footer">
          <Typography variant="caption" color="inherit" component="p" className={classes.typog}>
            Desenvolvido por <a 
            href="mailto:lucasgomidecv@gmail.com.br">Lucas Gomide</a>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}