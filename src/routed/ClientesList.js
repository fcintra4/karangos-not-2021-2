import React from "react"

import axios from "axios"

import {DataGrid} from '@mui/x-data-grid@next'
import Paper from '@mui/material/Paper'


const columns = [
    { field: 'id', 
    headerName: 'Cód',
    width: 100
    type: 'number',
    },
    { field: 'nome',
     headerName: 'Nome do Cliente',
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
    {   field: 'telefone',
        headerName: 'Telefone',
        width: 150,
      },
      {   field: 'email',
        headerName: 'E-mail',
        width: 200,
      },
    
  ];
  

export default function ClientesList(){

    const setstate = React.useState({
        clientes: []

    })
    const { clientes } = state 

    React.useEffect(() => {

//Usando o axios para acessar a API remota e obter dados
   axios.get('https://api.faustocintra.com.br/clientes').
   then(
       response => setstate({...state, clientes: response.data})
   )


    }, []) // vertor de dependências vazio  -> useEffect()
           // será executado apenas uma vez, durante o carregamento (montagem ) do componente

    return(

        <>

        <h1>Listagem Clientes</h1>
        <Paper>
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