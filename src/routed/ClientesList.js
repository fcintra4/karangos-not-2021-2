import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import { DataGrid } from '@mui/x-data-grid';
import { makeStyles } from '@mui/styles';
import Paper from '@mui/material/Paper';
import Snackbar from '@mui/material/Snackbar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import ConfirmDialog from '../ui/ConfirmDialog';

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles(theme => ({
  dataGrid: {
    '& .MuiDataGrid-row button': {
      visibility: 'hidden',
    },
    '& .MuiDataGrid-row:hover button': {
      visibility: 'visible',
    },
  },
  toolbar: {
    padding: 0,
    justifyContent: 'flex-end',
    margin: '20px 0',
  },
}));

export default function ClientesList() {
  const columns = [
    { field: 'id', headerName: 'Cód.', width: 100, type: 'number' },
    { field: 'nome', headerName: 'Nome do(a) cliente', width: 300 },
    { field: 'cpf', headerName: 'CPF', width: 150 },
    { field: 'rg', headerName: 'Doc. Identidade', width: 150 },
    { field: 'telefone', headerName: 'Telefone', width: 150 },
    { field: 'email', headerName: 'E-mail', width: 200 },
    {
      field: 'editar',
      headerName: 'Editar',
      width: 100,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <IconButton
          aria-label="Editar"
          onClick={() => {
            navigate(`/clientes/${params.id}`);
          }}
        >
          <EditIcon />
        </IconButton>
      ),
    },
    {
      field: 'excluir',
      headerName: 'Excluir',
      width: 100,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <IconButton
          aria-label="Excluir"
          onClick={() => {
            // eslint-disable-next-line no-console
            console.log({ params });
            handleDeleteClick(params.id);
          }}
        >
          <DeleteForeverIcon color="error" />
        </IconButton>
      ),
    },
  ];

  const classes = useStyles();
  const navigate = useNavigate();
  const [state, setState] = React.useState({
    clientes: [],
    isDialogOpen: false,
    deletable: null,
    isSnackOpen: false,
    snackMessage: '',
    isError: false,
  });
  const {
    clientes,
    isDialogOpen,
    deletable,
    isSnackOpen,
    snackMessage,
    isError,
  } = state;

  function getData(otherState = state) {
    // Usando o axios para acessar a API remota e obter os dados
    axios
      .get('https://api.faustocintra.com.br/clientes')
      .then((response) => setState({ ...otherState, clientes: response.data }));
  }

  React.useEffect(() => {
    getData();
  }, []);
  /* Vetor de dependências vazio -> useEffect()
   * será executado apenas uma vez, durante o
   * o carregamento (montagem) do componente
   */

  function handleDialogClose(answer) {
    setState({ ...state, isDialogOpen: false });

    // Resposta positiva
    if (answer) {
      // Usa o axios para enviar uma instrução de exclusão
      axios
        .delete(`https://api.faustocintra.com.br/clientes/${deletable}`)
        // Callback se der certo
        .then(() => {
          // 1. Exibir uma mensagem de feedback positivo para o usuário
          const newState = {
            ...state,
            isSnackOpen: true, // Exibe a snackbar
            snackMessage: 'Item excluído com sucesso',
            isDialogOpen: false,
            isError: false,
          };

          // 2. Recarregar os dados da lista
          getData(newState);
        })
        // Callback se der errado
        .catch((error) => {
          // 1. Exibe uma mensagem de feedback de erro para o usuário
          setState({
            ...state,
            isSnackOpen: true,
            snackMessage: `ERRO: não foi possível excluir. ${error.message}`,
            isDialogOpen: false,
            isError: true,
          });
        });
    }
  }

  function handleDeleteClick(id) {
    /* Abre a caixa de diálogo de confirmação e guarda o id do 
    registro a ser excluído, se a resposta for positiva */
    setState({ ...state, isDialogOpen: true, deletable: id });
  }

  function handleSnackClose(event, reason) {
    // Evita que o snackbar seja fechado clicando fora dele
    if (reason === 'clickaway') return;

    // Fechamento em condições normais
    setState({ ...state, isSnackOpen: false });
  }

  return (
    <>
      <h1>Listagem de Clientes</h1>

      <ConfirmDialog
        title="ATENÇÃO: operação irreversível"
        open={isDialogOpen}
        onClose={handleDialogClose}
      >
        Deseja realmente excluir este item?
      </ConfirmDialog>

      <Snackbar
        open={isSnackOpen}
        autoHideDuration={6000}
        onClose={handleSnackClose}
        message={snackMessage}
        action={
          <Button color="secondary" size="small" onClick={handleSnackClose}>
            {isError ? 'Que pena!' : 'Entendi'}
          </Button>
        }
      />

      <Toolbar className={classes.toolbar}>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          startIcon={<AddCircleIcon />}
          onClick={() => navigate('/clientes/new')}
        >
          Cadastrar novo cliente
        </Button>
      </Toolbar>

      <Paper elevation={4}>
        <DataGrid
          className={classes.dataGrid}
          rows={clientes}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
          autoHeight
          disableSelectionOnClick
        />
      </Paper>
    </>
  );
}
