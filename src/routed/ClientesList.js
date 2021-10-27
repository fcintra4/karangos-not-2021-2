import * as React from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper'

const columns = [
  { 
    field: 'id', 
    headerName: 'Cód.', 
    width: 70,
    type: 'number'
  },
  {
    field: 'nome', 
    headerName: 'Nome do(a) cliente', 
    width: 250 
  },
  {
    field: 'cpf', 
    headerName: 'CPF', 
    width: 180 
  },
  {
    field: 'rg',
    headerName: 'RG',
    width: 180,
  },
  {
    field: 'telefone',
    headerName: 'Telefone Celular',
    width: 150,
  },
  {
    field: 'email',
    headerName: 'email',
    width: 250,
  },
];
  

export default function ClientesList() {

    const [state, setstate] = React.useState({
        clientes: [],
    })
    const { clientes } = state
    
    React.useEffect(() => {

    // Usando o axios para acessar a API remota e obter os dados
    axios.get('https://api.faustocintra.com.br/clientes').
    then( // Callback para o caso de sucesso
        response => setstate({...state, clientes: response.data})
    )

    }, []) // O vetor de dependências [] ficará vazio, indicando que o useEffect é executado apenas uma vez no carregamento (montagem) do componente

    return (
        <>
        <h1>Listagem de Clientes</h1>
    <Paper elevation={4}>
      <DataGrid
        rows={clientes}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        autoHeight
      />
    </Paper>
        </>
    )
}