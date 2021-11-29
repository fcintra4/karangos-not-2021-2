import * as React from 'react'
import axios from 'axios'

import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper'
import { makeStyles } from '@mui/styles'
import Button from '@mui/material/Button'
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

export default function KarangosList() {

  const columns = [
    { field: 'id',
      headerName: 'Cód.',
      width: 100,
      type: 'number'
    },
    { field: 'marca', 
      headerName: 'Marca', 
      width: 100 
    },
    { field: 'modelo', 
      headerName: 'Modelo', 
      width: 100 
    },
    {
      field: 'cor',
      headerName: 'Cor',
      width: 100,
    },
    {
      field: 'ano_fabricacao',
      headerName: 'Ano de fabricação',
      width: 150,
    },
    {
      field: 'importado',
      headerName: 'Importado',
      width: 100,
    },
    {
      field: 'placa',
      headerName: 'Placa',
      witdh: 100,
    },
    {
      field: 'preco',
      headerName: 'Preço',
      witdh: 100,
    }
  ];

  const classes = useStyles()

  // const history = useHistory()

  const [state, setState] = React.useState({
    karangos: [],
    isDialogOpen: false,
    deletable: null,
    isSnackOpen: false,
    snackMessage: '',
    isError: false
  })
  const { karangos, isSnackOpen, snackMessage, isError } = state

  function getData(otherState) {
    // Usando o axios para acessar a API remota e obter os dados
    axios.get('https://api.faustocintra.com.br/karangos').then
    ( // Callback para o caso de sucesso
      response => setState({...otherState, karangos: response.data})
    )
  }

  React.useEffect(() => {
    getData()
  }, []) // Vetor de dependencias vazio -> useEffect()
         // será executado apenas uma vez, durante o
         // carregamento (montagem) do componente

  function handleSnackClose(event, reason) {
    // Evita que o snackbar seja fechado clicando-se fora dele
    if (reason === 'clickaway') return
    // Fechamento em condições normais
    setState({...state, isSnackOpen: false})
  }

  return (
    <>
      <h1>Listagem de Karangos</h1>

        <Snackbar
          open={isSnackOpen}
          autoHideDuration={6000}
          onClose={handleSnackClose}
          message={snackMessage}
          action={<Button color="secondary" size="small" onClick={handleSnackClose}>{isError ? 'Que pena!' : 'Entendi'}</Button>}
        />

      <Paper elevation={4}>
        <DataGrid
          className={classes.dataGrid}
          rows={karangos}
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