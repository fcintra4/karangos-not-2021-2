import React from "react";
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Paper } from "@mui/material";

const columns = [
  { field: 'id', headerName: 'Cód.', width: 70 },
  { field: 'nome', headerName: 'Nome do Cliente', width: 250 },
  { field: 'cpf', headerName: 'CPF', width: 150 },
  { field: 'rg', headerName: 'RG', width: 150,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.getValue(params.id, 'firstName') || ''} ${
        params.getValue(params.id, 'lastName') || ''
      }`,
  },
];


export default function ClientList(){

    const [state, setState] = React.useState({
        clients:[]
    })
    const {clients} = state;

    React.useEffect(()=> {
        axios.get('https://api.faustocintra.com.br/clientes').then(
            response => setState({...state, clients: response.data})
        )
    }, []);

    
    return (
        <>
            <h1> Listagem de Clientes</h1>
            <Paper elevation={4}>
                <DataGrid
                  rows={clients}
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