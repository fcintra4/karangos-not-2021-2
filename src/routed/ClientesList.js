import * as React from 'react'
import axios from 'axios'

import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper'
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { makeStyles } from '@mui/styles'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useHistory } from 'react-router-dom';
import ConfirmDialog from '../ui/ConfirmDialog'
import Snackbar from '@mui/material/Snackbar'

const useStyles = makeStyles(theme => ({
  dataGrid: {
      // sumindo com os botões de editar e excluir
      '& .MuiDataGrid-row button': { // todas as linhas tem a classe MuiDataGrid-row
          visibility: 'hidden'
      },
      // aparecendo somente quando passa o mouse em cima da linha
      '& .MuiDataGrid-row:hover button': {
          // hover é o estado de quando o mouse está em cima
        visibility: 'visible'
    }
  },
  toolbar: {
      padding: 0, // alinhando o botão à extremidade
      justifyContent: 'flex-end', // alinhando o botão à direita
      margin: '20px 0'
  }
}))



export default function ClientesList() {

    const columns = [
        { 
          field: 'id', 
          headerName: 'Cód',
          width: 100 ,
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
          width: 150 },
        {
          field: 'rg',
          headerName: 'Doc. Identidade',
          type: 'number',
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
            headerName: 'Editar',
            width: 100,
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
          width: 100,
          headerAlign: 'center',
          align: 'center',
          renderCell: params => (
              <IconButton 
              aria-label="Excluir"
              onClick={() => {console.log(params); handleDeleteClick(params.id)}}>
                  {/* Quando clicar no botão de excluir, armazena o
                  código na variável de estado deletable */}
                  <DeleteForeverIcon color = "error" />
              </IconButton>
          )
      },
      ];

    const classes = useStyles() // puxar o estilo pra dentro do componente

    const history = useHistory()

    // variável de estado para armazenar
    // os dados que voltarão do servidor
    const [state, setState] = React.useState({
        clientes: [],
        isDialogOpen: false,
        deletable: null
    })
    const {clientes, isDialogOpen, deletable} = state

    React.useEffect(() => {

        // usando axios para acessar a API remota e obter os dados
        axios.get('https://api.faustocintra.com.br/clientes').then(
            // callback para o caso de sucesso
            response => setState({...state, clientes: response.data})
        )

    }, [])  // vetor de dependências vazio => useEffect() será
            // executado apenas uma vez, durante o carregamento (montagem)
            // do componente

    function handleDialogClose(answer) {
        setState({...state, isDialogOpen: false})

        if(answer) { // resposta positiv            

            // usa o axios para enviar uma instrução de exclusão
            // à API de back-end
            axios.delete(`https://api.faustocintra.com.br/clientes/${deletable}`)
            .then ( // Callback caso dê certo
                // 1) Exibir uma mensagem de feedback positivo para o usuário
                // 2) Recarregar os dados da lista
            )
            .catch(
                // Callbck caso dê errado
                // 1) Exibir uma mensagem de feedback de erro para o usuário
            )
        }
    }

    function handleDeleteClick(id) {
        // abre a caixa de diálogo de confirmação e
        // guarda o id do registro a ser excluido,
        // se a resposta for positiva
        setState({...state, isDialogOpen: true, deletable: id})
    }

    return (
        <>
            <h1>Listagem de Clientes</h1>

            <ConfirmDialog
                title="ATENÇÃO: operação irreversível"
                open={isDialogOpen}
                onClose={handleDialogClose}
            >
                Deseja realmente excluir esse item?
            </ConfirmDialog>

            <Snackbar
                open={isSnackOpen}
                autoHideDuration={null}
                onClose={handleSnackClose}
                message={snackMessage}
                action={isError ? 'Que pena!' : 'Entendi'}
            />

            <Toolbar className={classes.toolbar}>
                <Button
                    variant="contained"
                    color="secondary" // cor do botão como secundaria (rosa)
                    size="large"
                    startIcon={<AddCircleIcon />} // icone "+" importado
                    onClick={() => history.push('/clientes/new')}
                    // botão levando à pagina de cadastro
                    // (empilhamento)
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