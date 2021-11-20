import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles'
import CoffeeIcon from '@mui/icons-material/Coffee';
import { padding } from '@mui/system';


const useStyles = makeStyles(theme => ({
  box: {
    position: "absolute",
    width: "100%",
  },
  typog: {
    textAlign: "center",
    width: "100%",
  },
  toolbar: {
    backgroundColor: theme.palette.background.hover,
    padding: 0,
    minHeight: '40px'

  },
  link: {
    color: theme.palette.secondary.light,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  },

}
));

export default function AppFooter() {
  const classes = useStyles();
  return (
    <Box className={classes.box} sx={{ flexGrow: 1 }}>
      <AppBar position="static" component="footer" sx={{ height: '40px' }}>
        <Toolbar className={classes.toolbar} variant="dense">
          <Typography className={classes.typog} variant="caption" color="inherit" component="p">
            Desenvolvido com <CoffeeIcon fontSize="small"/> por <a className={ classes.link } href="rafaelmenegheti52@gmail.com">Rafael Menegheti</a>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
