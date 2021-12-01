import * as React from 'react';
//import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
  link: {
    color: theme.palette.text.primary,
    textDecoration: 'nome',
    padding: '10px',
    width: '100%'
  },
  menuItem: {
    padding: 0
  },
  menuLink: {
    color: theme.palette.text.primary,
    textAlign: 'center'
  }
}))

export default function MainMenu() {
  const classes = useStyles()
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
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
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
        <MenuItem onClick={handleClose} className={classes.menuItem}>
          <Link to="/" className={classes.menuLink} >Home</Link>
        </MenuItem>
        <MenuItem onClick={handleClose} className={classes.menuItem}>
          <Link to="/clientes" className={classes.menuLink} >Listagem de clientes</Link>
        </MenuItem>
        <MenuItem onClick={handleClose} className={classes.menuItem}>
          <Link to="/clientes/new"className={classes.menuLink}>Cadastrar novo cliente</Link>
        </MenuItem>
        <MenuItem onClick={handleClose} className={classes.menuItem}>Logout</MenuItem>
        <MenuItem onClick={handleClose} className={classes.menuItem}>
          <Link to="/karangos" className={classes.menuLink} >Listagem de Karangos</Link>
        </MenuItem>
        <MenuItem onClick={handleClose} className={classes.menuItem}>
          <Link to="/Karangos/new"className={classes.menuLink}>Cadastrar novo Karango</Link>
        </MenuItem>
      </Menu>
    </div>
  );
}
