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
    appbar: {
        height: '40px'
    },
    link: {
        color: theme.palette.secondary.light,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline'
        }
    },
}))

export default function AppFooter() {

    const classes = useStyles();

  return (
    <Box sx={{ flexGrow: 1 }} className={classes.box} >
      <AppBar position="static" component="footer" className={classes.appbar} >
        <Toolbar variant="dense" className={classes.toolbar}>
          <Typography variant="caption" color="inherit" component="p" className={classes.typog}>
            Desenvolvido com <CoffeeIcon fontSize="small"/> por <a className={classes.link} href="gustavo.vieira16@fatec.sp.gov.br">Gustavo dos Reis Vieira</a>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
