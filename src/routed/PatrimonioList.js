import * as React from 'react'
import axios from 'axios'

import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { makeStyles } from '@mui/styles'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useHistory } from 'react-router-dom'
import ConfirmDialog from '../ui/ConfirmDialog'
import Snackbar from '@mui/material/Snackbar'

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
    margin: '20px 0'
  }
}))

export default function ClientesList() {

  const columns = [
    { field: 'parimonio',
      headerName: 'Núm. de patrimônio',
      width: 160,
    },
    { field: 'equipamento-nome', 
      headerName: 'Equipamento', 
      width: 250 
    },
    { field: 'marca', 
      headerName: 'Marca', 
      width: 250 
    },
    {
      field: 'modelo',
      headerName: 'Modelo',
      width: 250,
    },
    {
      field: 'usuario',
      headerName: 'Usuário',
      width: 150,
    },
    {
      field: 'departamento',
      headerName: 'Departamento',
      width: 150,
    },
    {
      field: 'editar',
      headerName: 'Editar',
      witdh: 100,
      headerAlign: 'center',
      align: 'center',
      renderCell: params => (
        <IconButton 
        aria-label="Editar"
        onClick={() => history.push(`/equipamentos/${params.id}`)}
        >
          <EditIcon />
        </IconButton>
      )
    },
    {
      field: 'excluir',
      headerName: 'Excluir',
      witdh: 100,
      headerAlign: 'center',
      align: 'center',
      renderCell: params => (
        <IconButton aria-label="Excluir" onClick={() => {console.log({params}); handleDeleteClick(params.id)}}>
          <DeleteForeverIcon color="error"/>
        </IconButton>
      )
    }
  ];

  const classes = useStyles()

  const history = useHistory()

  const [state, setState] = React.useState({
    equipamentos: [],
    isDialogOpen: false,
    deletable: null,
    isSnackOpen: false,
    snackMessage: '',
    isError: false
  })
  const { equipamentos, isDialogOpen, deletable, isSnackOpen, snackMessage, isError } = state

  function getData(otherState) {
    // Usando o axios para acessar a API remota e obter os dados
    axios.get('https://api.faustocintra.com.br/clientes').then
    ( // Callback para o caso de sucesso
      response => setState({...otherState, equipamentos: response.data})
    )
  }

  React.useEffect(() => {
    getData()
  }, []) // Vetor de dependencias vazio -> useEffect()
         // será executado apenas uma vez, durante o
         // carregamento (montagem) do componente

  function handleDialogClose(answer) {
    setState({...state, isDialogOpen: false})

    if(answer) { // resposta positiva
      
      // Usa o axios para enviar uma instrução de exclusão
      // à API d back-end
      axios.delete(`https://api.faustocintra.com.br/clientes/${deletable}`)
      .then (
        // Callback se der certo
        // 1) Exibir uma mensagem de feedback positivo para o usuário
        () => {
          const newState = ({
          ...state,
          isSnackOpen: true, // exibe a snackbar
          snackMessage: 'Item excluído com sucesso',
          isDialogOpen: false,
          isError: false
          })

          // 2) Recarregar os dados da lista
          getData(newState)
        }
      ) 
      .catch (
        // Callback se der errado
        error => {
          // 1) Exibir uma mensagem de feedback de erro para o usuário
          setState({
            ...state,
            isSnackOpen: true,
            snackMessage: 'ERRO: não foi possível excluir, ' + error.message,
            isDialogOpen: false,
            isError: true
          })
        }
      )
    }
  }

  function handleDeleteClick(id) {
    // Abre a caixa de dialogo de confirmação e guarda
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
      <h1>Controle de patrimônio</h1>

        <ConfirmDialog 
          title="ATENÇÃO"
          open={isDialogOpen}
          onClose={handleDialogClose}
        > 
          Deseja realmente excluir esse item?
        </ConfirmDialog>

        <Snackbar
          open={isSnackOpen}
          autoHideDuration={6000}
          onClose={handleSnackClose}
          message={snackMessage}
          action={<Button color="secondary" size="small" onClick={handleSnackClose}>{isError ? 'Que pena!' : 'Entendi'}</Button>}
        />

        <Toolbar className={classes.toolbar}>
          <Button 
           variant="contained" 
           color="secondary"
           size="large" 
           startIcon={<AddCircleIcon />}
           onClick={() => history.push('/equipamento/novo')}
          >
            Cadastrar novo equipamento
          </Button>
        </Toolbar>

      <Paper elevation={4}>
        <DataGrid
          className={classes.dataGrid}
          rows={equipamentos}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          autoHeight
          disableSelectionOnClick
        />
      </Paper>
    </>
  )
}