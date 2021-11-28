import * as React from 'react'
import axios from 'axios'

import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';

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
      field: 'cor',
      headerName: 'Cor',
      width: 100,
    },
    {
      field: 'ano_fabricacao',
      headerName: 'Ano de Fabricacao',
      width: 150
    },
    {
      field: 'importado',
      headerName: 'Importado',
      width: 100
    },
    {
      field: 'placa',
      headerName: 'Placa',
      width: 100
    },
    {
      field: 'preco',
      headerName: 'Preço',
      width: 100
    }
  ];

  const classes = useStyles()

  const [state, setState] = React.useState({
    karangos: [],
  })
  const { karangos } = state

  function getData(otherState = state) {
    // Usando o axios para acessar a API remota e obter os dados
    axios.get('https://api.faustocintra.com.br/karangos').then(   // Callback para o caso de sucesso
      response => setState({ ...otherState, karangos: response.data })
    )
  }

  React.useEffect(() => {
    getData()
  }, []) // Vetor de dependências vazio -> useEffect()
  // será executado apenas uma vez, durante o
  // o carregamento (montagem) do componente

  return (
    <>
      <h1>Listagem de Karangos</h1>

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