import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles'


const useStyles = makeStyles(theme => ({
    link: {
        color: theme.palette.text.primary,
        textDecoration: 'none',
        padding: '5px',
        width: '100%'
    },
    menuItem: { 
        padding: '0',        
    }
}));

export default function MainMenu() {

    const classes = useStyles(); 

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                id="basic-button"
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                aria-controls="basic-menu"
                aria-haspopup="true"
                sx={{ mr: 2 }}
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <MenuIcon />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem className= { classes.menuItem } onClick={handleClose}>
                    <Link className={ classes.link } to="/clientes">Listagem de Clientes</Link>
                </MenuItem>
                <MenuItem className= { classes.menuItem } onClick={handleClose}>
                    <Link className={ classes.link } to="/clientes/new">Cadastrar Cliente</Link>
                </MenuItem>
            </Menu>
        </div>
    );
}