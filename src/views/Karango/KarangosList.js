import * as React from 'react'

import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { makeStyles } from '@mui/styles'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useHistory } from 'react-router-dom'
import ConfirmDialog from '../../components/ConfirmDialog'
import Snackbar from '@mui/material/Snackbar';

import api from '../../service/Api';

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

export default function KarangosList() {

  const columns = [
    { 
      field: 'id', 
      headerName: 'Cód.', 
      width: 100,
      type: 'number' 
    },
    { 
      field: 'marca', 
      headerName: 'Marca', 
      width: 150 
    },
    { 
      field: 'modelo', 
      headerName: 'Modelo', 
      width: 150 
    },
    {
      field: 'placa',
      headerName: 'Placa',
      width: 150
    },
    { 
      field: 'cor', 
      headerName: 'Cor', 
      width: 150 
    },
    {
      field: 'ano_fabricacao',
      headerName: 'Ano Fabricacao',
      width: 150,
      type: 'number' 
    },
    {
      field: 'preco',
      headerName: 'Preco',
      width: 90
    },
    {
      field: 'editar',
      headerName: 'Editar',
      width: 100,
      headerAlign: 'center',
      align: 'center',
      renderCell: params => (
        <IconButton 
          aria-label="Editar"
          onClick={() => history.push(`/karangos/${params.id}`)}
        >
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
        <IconButton 
          aria-label="Excluir"
          onClick={() => {console.log({params}); handleDeleteClick(params.id)}}
        >
          <DeleteForeverIcon color="error" />
        </IconButton>
      )
    }  
  ];

  const classes = useStyles()
  const history = useHistory()

  const [state, setState] = React.useState({
    karangos: [],
    isDialogOpen: false,
    deletable: null,
    isSnackOpen: false,
    snackMessage: '',
    isError: false
  })
  const { karangos, isDialogOpen, deletable, isSnackOpen, snackMessage, isError } = state

  function getData(otherState = state) {
    api.get('/karangos').then( 
      response => setState({...otherState, karangos: response.data})
    )
  }

  React.useEffect(() => {
    getData()
  }, [])

  function handleDialogClose(answer) {
    setState({...state, isDialogOpen: false})

    if(answer) { 
      api.delete(`/karangos/${deletable}`)
        .then (
          () => {
            const newState = ({
              ...state,
              isSnackOpen: true, 
              snackMessage: 'Item excluído com sucesso',
              isDialogOpen: false,
              isError: false
            })

            getData(newState)
          }
          
        )
        .catch (
          error => {
            setState({
              ...state,
              isSnackOpen: true,
              snackMessage: 'ERRO: não foi possível excluir. ' + error.message,
              isDialogOpen: false,
              isError: true
            })
          }
        )
    }
  }

  function handleDeleteClick(id) {
    setState({...state, isDialogOpen: true, deletable: id})
  }

  function handleSnackClose(event, reason) {
    if (reason === 'clickaway') return
    
    setState({...state, isSnackOpen: false})
  }

  return (
    <>
      <h1>Listagem de Carros</h1>

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
          onClick={() => history.push('/karangos/new')}
        >
          Cadastrar novo carro
        </Button>
      </Toolbar>

      <Paper elevation={4}>
        <DataGrid
          className={classes.dataGrid}
          rows={karangos}
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