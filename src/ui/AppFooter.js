import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CoffeeIcon from '@mui/icons-material/Coffee';
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
    }
}))

export default function AppFooter() {

    const classes = useStyles()

    return (
        <Box sx={{ flexGrow: 1 }} className={classes.box}>
        <AppBar position="static" component="footer">
            <Toolbar variant="dense" className={classes.toolbar}>
            <Typography variant="h6" color="inherit" component="p" className={classes.typog}>
                Desenvolvido com <CoffeeIcon fontsize="small" /> por <a className={classes.link} href="mail:hugomacielcesar@gmail.com.br">Hugo Maciel</a>
            </Typography>
            </Toolbar>
        </AppBar>
        </Box>
    );
}