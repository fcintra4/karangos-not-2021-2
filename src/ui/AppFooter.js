import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles'
import CoffeeIcon from '@mui/icons-material/Coffee';


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
    backgroundColor: theme.palette.background.paper,
    padding: 0
  },
  link: {
    color: theme.palette.secondary.light,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  }
}))


export default function AppFooter() {

  const classes = useStyles()

  return (
    <Box sx={{ flexGrow: 1 }} className={classes.box}>
      <AppBar position="static" component="footer" sx={{ height: '40px' }}>
        <Toolbar variant="dense" className={classes.toolbar}>
          <Typography variant="caption" color="inherit" component="p" className={classes.typog}>
            Desenvolvido com
            <CoffeeIcon fontsize="small" />
             por
            <a href="mailto:heliobarolo0586@gmail.com" className={classes.link}> Hélio Barolo - Fatec Franca</a>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
