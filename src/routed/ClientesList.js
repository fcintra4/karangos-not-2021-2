import * as React from 'react'
import axios from 'axios'

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
    headerName: 'editar',
    width: 100,
    headerAlign: 'center',
    align: 'center',
    renderCell: () => (
      //O aria label serve para deficientes visuais consigam ler através do leitor de textos
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
    renderCell: () => (
      //O aria label serve para deficientes visuais consigam ler através do leitor de textos
      <IconButton aria-label="Excluir">
        <DeleteForeverIcon color="error" />
      </IconButton>
    )
  }
];

export default function ClientesList() {

  const classes = useStyles()

  const history = useHistory()

  const [state, setState] = React.useState({
    clientes: []
  })
  const { clientes } = state

  React.useEffect(() => {

    // Usando o axios para acessar a API remota e obter os dados
    axios.get('https://api.faustocintra.com.br/clientes').then(   // Callback para o caso de sucesso
      response => setState({...state, clientes: response.data})
    )


  }, []) // Vetor de dependências vazio -> useEffect()
         // será executado apenas uma vez, durante o
         // o carregamento (montagem) do componente

  return (
    <>
      <h1>Listagem de Clientes</h1>

      <Toolbar className={classes.toolbar}>
    <Button
    variant="contained"
    color="secondary"
    size="large"
    startIcon={<AddCircleIcon />}
    onClick={() => history.push('/clientes/new')}
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
  )
}