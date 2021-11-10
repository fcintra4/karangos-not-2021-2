import * as React from 'react'
import axios from 'axios'

import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => ({
  dataGrid: {
    '& .MuiDataGrid-row button': {
      visibility: 'hidden'
    },
    '& .MuiDataGrid-row:hover button': {
      visibility: 'visible'
    }
  }
}))

const columns = [
  { field: 'id',
    headerName: 'Cód.',
    width: 100,
    type: 'number'
  },
  { field: 'nome', 
    headerName: 'Nome', 
    width: 300 
  },
  { field: 'cpf', 
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
    width: 150,
  },
  {
    field: 'email',
    headerName: 'E-mail',
    width: 200,
  },
  {
    field: 'editar',
    headerName: 'Editar',
    witdh: 100,
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
    witdh: 100,
    headerAlign: 'center',
    align: 'center',
    renderCell: () => (
      <IconButton aria-label="Excluir">
        <DeleteForeverIcon color="error"/>
      </IconButton>
    )
  }
];

export default function ClientesList() {

  const classes = useStyles()

  const [state, setState] = React.useState({
    clientes: []
  })
  const { clientes } = state

  React.useEffect(() => {

    // Usando o axios para acessar a API remota e obter os dados
    axios.get('https://api.faustocintra.com.br/clientes').then
    ( // Callback para o caso de sucesso
      response => setState({...state, clientes: response.data})
    )

  }, []) // Vetor de dependencias vazio -> useEffect()
         // será executado apenas uma vez, durante o
         // carregamento (montagem) do componente

  return (
    <>
      <h1>Listagem de Clientes</h1>
      <Paper elevation={4}>
        <DataGrid
          className={classes.dataGrid}
          rows={clientes}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          autoHeight
        />
      </Paper>
    </>
  )
}