import * as React from 'react'
import axios from 'axios'

import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { makeStyles } from '@mui/styles'
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useHistory } from 'react-router-dom';
import ConfirmDialog from '../ui/ConfirmDialog';
import Snackbar from '@mui/material/Snackbar';

const useStyles = makeStyles(theme => ({
  dataGrid: {
      '& .MuiDataGrid-row button': {
          visibility: 'hidden'
      },
      '& .MuiDataGrid-row:hover button': {
        visibility: 'visible'
      }
  },
  toolbar: {
      padding: 0,
      justifyContent: 'flex-end',
  }
}))

export default function ClientesList() {

    const columns = [
        { 
          field: 'id', 
          headerName: 'Cód.', 
          width: 100,
          type: 'number' 
        },
        { 
          field: 'nome', 
          headerName: 'Nome do(a) cliente', 
          width: 300 
        },
        { 
          field: 'cpf', 
          headerName: 'CPF', 
          width: 150 
        },
        {
          field: 'rg',
          headerName: 'Doc. Identidade',
          width: 150,
        },
        {
          field: 'telefone',
          headerName: 'Telefone',
          width: 150
        },
        {
          field: 'email',
          headerName: 'E-mail',
          width: 200
        },
        {
            field: 'editar',
            headerName: 'Editar',
            width: 100,
            headerAlign: 'center',
            align: 'center',
            renderCell: () => (
                <IconButton aria-label="Editar">
                    <EditIcon />
                </IconButton>
            )
        },
        {
          field: 'excluir',
          headerName: 'Excluir',
          width: 100,
          headerAlign: 'center',
          align: 'center',
          renderCell: params => (
              <IconButton aria-label="Excluir"
              onClick={() => handleDeleteClick(params.id)}
              >
                  <DeleteForeverIcon color="error" />
              </IconButton>
          )
      }   
      ];

    const classes = useStyles()

    const history = useHistory()

  const [state, setState] = React.useState({
    clientes: [],
    isDialogOpen: false,
    deletable: null,
    isSnackOpen: false,
    snackMessage: '',
    isError: false
  })
  const { clientes, isDialogOpen, deletable, isSnackOpen, snackMessage, isError } = state

  React.useEffect(() => {

    // Usando o axios para acessar a API remota e obter os dados
    axios.get('https://api.faustocintra.com.br/clientes').then(   // Callback para o caso de sucesso
      response => setState({...state, clientes: response.data})
    )


  }, []) // Vetor de dependências vazio -> useEffect()
         // será executado apenas uma vez, durante o
         // o carregamento (montagem) do componente


  function handleDialogClose(answer) {
      setState({...state, isDialogOpen:false})

      if(answer) { // resposta positiva

        // usa o axios para enviar uma instrução de exclusão
        // à API de back-end
        axios.delete(`https://api.api.faustocintra.com.br/clientes/${deletable}`)
            .then (
                // callbakc se der certo
                //1) exibir uma mensagem de feedback para o usuario
                //2) Recarregar os dados da pagina

            )
            .catch(
                // callback se der errado
                //1) exibir mensagem de feedback de erro para o usuario
            )

      }
  }

  function handleDeleteClick(id) {
      //Abre a caixa de dialogo de confirmação e guarda
      // o id do registro a ser excluido, se a resposta for
      // positiva
      setState({...state, isDialogOpen: true, deletable: id})
  }

  function handleSnackClose(event, reason) {
    // Evita que o snackbar seja fechado clicando-se fora dele
    if (reason === 'clickaway') return
    
    // Fechamento em condições normais
    setState({...state, isSnackOpen: false})
    }

  return (
    <>
      <h1>Listagem de Clientes</h1>

      <ConfirmDialog
        title="ATENÇAO: operação irreversível"
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
        action={isError ? 'Que pena!' : 'Entendi'}
      />

      <Toolbar className={classes.toolbar}>
          <Button
          variant="contained"
          color="secondary"
          size="large"
          startIcon={<AddCircleIcon/>}
          onClick={() => history.push('/clientes/new')}
          >
            Cadastrar novo cliente</Button>
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
  )
}