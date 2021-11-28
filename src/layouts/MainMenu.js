import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => ({
  link: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
    padding: '10px',
    width: '100%'

  },
  menuItem: {
    padding: 0
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
          <RouterLink to="/clientes" className={classes.link}>Listagem de clientes</RouterLink>
        </MenuItem>
        <MenuItem onClick={handleClose} className={classes.menuItem}>
          <RouterLink to="/clientes/new" className={classes.link}>Cadastrar novo cliente</RouterLink>
        </MenuItem>

        <MenuItem onClick={handleClose} className={classes.menuItem}>
          <RouterLink to="/karangos" className={classes.link}>Listagem de karango</RouterLink>
        </MenuItem>
        <MenuItem onClick={handleClose} className={classes.menuItem}>
          <RouterLink to="/karangos/new" className={classes.link}>Cadastrar novo karango</RouterLink>
        </MenuItem>

      </Menu>
    </div>
  );
}
