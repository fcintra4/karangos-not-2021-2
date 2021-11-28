import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';


const useStyles = makeStyles( theme => ({
    box:{
        position:'fixed',
        bottom: 0 ,
        width: '100%'
        
    },
    typog: {
        textAlign: 'center',
        width:'100%'
    },
    toolbar: {
        backgroundColor: theme.palette.background.paper,
        padding: 0,
        minHeight: '40px'
    },
    link: {
        color: theme.palette.secondary.main,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline'
        }
    }
    
}));

export default function AppFooter() {

    const classes = useStyles();

  return (
    <Box sx={{ flexGrow: 1 }} className={classes.box} >
      <AppBar position="static"  component="footer" sx={{height:'40px'}}>
        <Toolbar variant="dense" className={classes.toolbar}>
          <Typography variant="caption" color="inherit" component="p" className={classes.typog}>
            Desenvolvido por <a className={classes.link } href="mailto:ruanncarlosmg@gmail.com">
                Ruann</a> com <FavoriteIcon fontSize="extra-small" />
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}