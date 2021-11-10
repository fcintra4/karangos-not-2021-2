import * as React from 'react'
import axios from  'axios'
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { makeStyles } from '@mui/styles';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {useHistory} from 'react-router-dom'
import ConfirmDialog from '../ui/ConfirmDialog'
import { Snackbar } from '@mui/material';

const useStyles = makeStyles(theme => ({
    dataGrid: {
        //& significa o próprio dataGrid
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
        },
        {
        field: 'editar',
        headerName: 'Editar',
        width: 100,
        headerAlign: 'center',
        align: 'center',
        //Usar renderCell para colocar o botão
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
            //Usar renderCell para colocar o botão
            renderCell: params => (
                <IconButton 
                aria-label="Excluir"
                onClick={() => handleDeleteClick(params.id)}
                >
                    <DeleteForeverIcon color="error" />
                </IconButton>
            )
            }
        ];

        //Esconder ícones
        const classes = useStyles()

        const history = useHistory()

        //Criação da variavel de estado com tudo dentro
        const [state, setState] = React.useState({
            clientes: [],
            isDialogOpen: false,
            deletable: null,
            isSnackOpen: false,
            snackMessage: '',
            isError: false
        })

        const { clientes, isDialogOpen, deletable, isSnackOpen, snackMessage, isError } = state

        //Atualizar tabela
        function getData(otherState = state) {
            // Usando o axios para acessar a API remota e obter os dados    
            axios.get('https://api.faustocintra.com.br/clientes').then
            ( //Callback para o caso de sucesso
                response => setState({...otherState, clientes: response.data})
            )
        }

        React.useEffect(() => {
            getData()
        }, [])  // Vetor de dependencias vazio -> useEffect()
                //será executado apenas uma vez, durante o 
                //carregamento (montagem) do componenete    

        function handleDialogClose(answer) {
            setState({...state, isDialogOpen: false})
            if(answer) {    // Resposta positiva

                // Usa o axios para enviar uma instrução de exclusão à API de back-end
                axios.delete(`https://api.faustocintra.com.br/clientes/${deletable}`)
                    .then (
                        // <> Callback se der certo <>
                        //1) Exibir uma mensagem de feedback positivo ao usuário
                        () => {
                            const newState = ({
                                ...state,
                                isSnackOpen: true,  //exibe o snackbar
                                snackMessage: 'Item excluído com sucesso!',
                                isDialogOpen: false,
                                isError: false
                            })

                        //2) Recarregar os dados da lista 
                        getData(newState)
                        }

                    )
                    .catch (
                        // <> Callback se der errado <>
                        error => {
                            //1) Exibir uma mensagem de feedback de erro para o usuário
                            setState({
                                ...state,
                                isSnackOpen: true,
                                snackMessage: 'ERRO: não foi possível excluir.' + error.message,
                                isDialogOpen:false,
                                isError: true
                            })
                        }
                    )

            }
        }

        function handleDeleteClick(id) {
            //Abre a caixa de confirmação e guarda o id do registro a ser excluído, se 
            //a resposta for positiva.
            setState({...state, isDialogOpen: true, deletable: id})
        }

        function handleSnackClose(event, reason) {
            // Evita que o snackbar seja fechado clicando-se fora dele
            if (reason === 'clickaway') return
            
            // Fechamento em condições normais
            setState({...state, isSnackOpen: false})
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
                    autoHideDuration={6000} // 6 segundos ele fecha sozinho
                    onClose={handleSnackClose}
                    message={snackMessage}
                    action={
                        <Button color="secondary" size="small" onClick={handleSnackClose}>
                            {isError ? 'Que pena!' : 'Entendi'}
                        </Button>
                    }
                />

                <Toolbar className={classes.toolbar}>
                    <Button
                    variant="contained"
                    color="secondary"
                    size="large"     
                    startIcon={<AddCircleIcon />}   
                    onClick={() => history.push('/clientes/new')}     //cria uma "pilha de paginas", ou seja se vc voltar a pag volta a interior       
                    >
                    Cadastrar novo cliente</Button>
                </Toolbar>

                <Paper elevation={4}>
                <DataGrid
                    className={classes.dataGrid}
                    rows={clientes}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[10]}
                    checkboxSelection
                    autoHeight
                    disableSelectionOnClick
                />
                </Paper>
            </>
        )
    }