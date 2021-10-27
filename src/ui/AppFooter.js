import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { makeStyles } from '@mui/styles'
import CoffeeIcon from '@mui/icons-material/Coffee';

const useStyles = makeStyles(theme => ({
    box: {
        position: 'absolute',
        bottom: 0,
        width: '100%'
    },
    typog:{
        textAlingn: 'center', //text-align: center
        width: '100%'
    },
    toolbar: {
        backgroundColor: theme.palette.background.hover,
        padding: 0,
        minHeight: '40px'
    },
    link:{
        color: theme.palette.secondary.main,
        textDecoration: 'none',
        '&: hover': {
            textDecoration: 'underline'
        }
    },


}))

export default function AppFooter() {
    const classes = useStyles()
  return (
    <Box sx={{ flexGrow: 1 }} className={classes.box}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="caption" color="inherit" component="p" className={classes.typog}>
            Desenvolvido com <CoffeeIcon fontSize="small" /> por <a className={classes.link} href="mailto: dirceu.garcia@fatec.sp.gov.br">Dirceu Garcia</a>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
