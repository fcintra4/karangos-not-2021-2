import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ConfirmDialog({title, children, open = false, onClose}) {

  const handleClose = answer => {
    onClose(answer)
  };

  return (
    <div>
      <Dialog
        open={open}
        // usuario clicou fora da caixa de diálogo ou apertou "esc"
        onClose={() => handleClose(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {children}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
            {/* Usuário clicou no OK */}
          <Button onClick={() => handleClose(true)}>OK</Button>
          {/* Usuário clicou em Cancelar */}
          <Button onClick={handleClose} autoFocus>Cancelar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}