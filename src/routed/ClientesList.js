import * as React from 'react'
import axios from  'axios'
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper'

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
        width: 250 
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
      width: 150,
    },
    {
        field: 'email',
        headerName: 'E-mail',
        width: 200,
    }
  ];
  
  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];    

    export default function ClientesList() {

        const [state, setState] = React.useState({
            clientes: []
        })
        const { clientes } = state

        React.useEffect(() => {

        // Usando o axios para acessar a API remota e obter os dados    
        axios.get('https://api.faustocintra.com.br/clientes').then
        ( //Callback para o caso de sucesso
            response => setState({...state, clientes: response.data})
        )

        }, [])  // Vetor de dependencias vazio -> useEffect()
                //será executado apenas uma vez, durante o 
                //carregamento (montagem) do componenete    

        return (
            <>
                <h1>Listagem de Clientes</h1>
                <Paper elevation={4}>
                <DataGrid
                    rows={clientes}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[10]}
                    checkboxSelection
                    autoHeight
                />
                </Paper>
            </>
        )
    }