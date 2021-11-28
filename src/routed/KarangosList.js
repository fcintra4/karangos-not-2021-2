import * as React from 'react'
import axios from 'axios'

import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper'
import { makeStyles } from '@mui/styles'
import Button from '@mui/material/Button'
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
    margin: '20px 0'
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
      field: 'cor',
      headerName: 'Cor',
      width: 150,
    },
    {
      field: 'ano_fabricacao',
      headerName: 'Ano de Fabricação',
      width: 150,
      type: 'number' 
    },
    {
      field: 'importado',
      headerName: 'É Importado?',
      width: 150,
      type: 'number',
      valueFormatter: (params) => {
        return `${Number(params.value) === 1 ? 'Sim': 'Não'}`;
    }
    },
    {
      field: 'placa',
      headerName: 'Placa do Carro',
      width: 150
    },
    {
      field: 'preco',
      headerName: 'Preço',
      width: 150,
      type: 'number',
      valueFormatter: (params) => {
        const valueFormatted = Number(params.value * 1).toLocaleString();
        return `R$ ${valueFormatted}`;
      }
    }
  ];

  const classes = useStyles()

  const [state, setState] = React.useState({
    carros: [],
    isSnackOpen: false,
    snackMessage: '',
    isError: false
  })
  const { carros, isSnackOpen, snackMessage, isError } = state

  function getData(otherState = state) {
    // Usando o axios para acessar a API remota e obter os dados
    axios.get('https://api.faustocintra.com.br/karangos').then(   // Callback para o caso de sucesso
      response => setState({...otherState, carros: response.data})
    )
  }

  React.useEffect(() => {
    getData()
  }, []) // Vetor de dependências vazio -> useEffect()
         // será executado apenas uma vez, durante o
         // o carregamento (montagem) do componente

  function handleSnackClose(reason) {
    // Evita que o snackbar seja fechado clicando-se fora dele 
    if (reason === 'clickaway') return
    
    // Fechamento em condições normais
    setState({...state, isSnackOpen: false})
  }

  return (
    <>
      <h1>Listagem de Carros</h1>

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

      <Paper elevation={4}>
        <DataGrid
          className={classes.dataGrid}
          rows={carros}
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