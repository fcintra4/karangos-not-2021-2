import * as React from 'react'
import axios from 'axios'

import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper'
import { makeStyles } from '@mui/styles'


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
      headerName: 'Marca do veículo', 
      width: 300 
    },
    { 
      field: 'modelo', 
      headerName: 'Modelo', 
      width: 150 
    },
    {
      field: 'cor',
      headerName: 'Cor do veículo',
      width: 150,
    },
    {
      field: 'ano_fabricacao',
      headerName: 'Ano de fabricação',
      width: 150
    },
    {
      field: 'importado',
      headerName: 'Veículo importado?',
      width: 200
    },
    {
      field: 'placa',
      headerName: 'Placa do veículo',
      width: 200
    },
    {
      field: 'preco',
      headerName: 'Preço do veículo',
      width: 200
    },
    
  ];

  const classes = useStyles()

  const [state, setState] = React.useState({
    veiculos: [],
  })

  const { veiculos } = state

  function getData(otherState = state) {
    /* PARA BUSCAR OS DADOS DA API REMOTA */
    axios.get('https://api.faustocintra.com.br/karangos').then( 
      response => {
        response.data.forEach(item => {
          if(item.importado === "0"){
            item.importado = 'Não'
          } else {
            item.importado = "Sim"
          }
        })
        setState({...otherState, veiculos: response.data})
      }
    )
  }

  React.useEffect(() => {
    getData()
  }, []) 
  return (
    <>
      <h1>Listagem de Veículos</h1>


      <Paper elevation={4}>
        <DataGrid
          className={classes.dataGrid}
          rows={veiculos}
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