import * as React from 'react'
import axios from 'axios'
import Paper from '@mui/material/Paper'

import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { 
        field: 'id',
        headerName: 'Cod',
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
        width: 150,
    },
    {
        field: 'email',
        headerName: 'E-mail',
        width: 200
     },
];




export default function ClientesList() {

    const [state, setState] = React.useState({
        clientes: []
    })
    const { clientes } = state


    React.useEffect(() => {

        // usando o axios para acessar a API remota e obter os dados
        axios.get('https://api.faustocintra.com.br/clientes').then(
            response => setState({...state, clientes: response.data})
        )

    }, []) // vetor de dependencias vazio - significa que o -> useEffect() será usado apenas uma vez, durante o carregamento do componente

    return (
        <>
        <h1> Listagem de Clientes </h1>
        <Paper elevation={4}>
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