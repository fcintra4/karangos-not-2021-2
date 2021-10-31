import * as React from 'react';
import axios from 'axios';



import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper'

const columns = [
    { field: 'id', headerName: 'Código', width: 100, type: 'number' },
    { field: 'nome', headerName: 'Nome cliente', width: 250 },
    { field: 'cpf', headerName: 'CPF', width: 130 },
    {
        field: 'rg',
        headerName: 'RG',
        width: 130,
    },
    {
        field: 'telefone',
        headerName: 'Telefone',
        width: 130,
    },
    {
        field: 'email',
        headerName: 'E-mail',
        width: 250,
    }
];





export default function ClientesList() {


    const [state, setState] = React.useState({
        clientes: []
    })

    const { clientes } = state


    React.useEffect(() => {
        axios.get('https://api.faustocintra.com.br/clientes')
            .then(
                response => setState({ ...state, clientes: response.data })
            )
        console.log(JSON.stringify(clientes))
    }, [])


    return (
        <>
            <h1>Listagem de clientes</h1>
            <Paper elevation={10}>
                <DataGrid
                    rows={clientes}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[5]}
                    autoHeight

                />
            </Paper>
        </>
    )
}