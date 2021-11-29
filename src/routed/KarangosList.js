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



export default function KarangosList() {

    const columns = [
        { 
          field: 'id', 
          headerName: 'ID',
          width: 100 ,
          type: 'number'
        },
        { 
          field: 'marca', 
          headerName: 'Marca', 
          width: 150 
        },
        { 
          field: 'modelo', 
          headerName: 'Modelo', 
          width: 150 
        },
        {
          field: 'cor',
          headerName: 'Cor',
          width: 100,
        },
        {
            field: 'ano_fabricacao',
            headerName: 'Ano de fabricação',
            type: 'number',
            width: 150
        },
        {
            field: 'importado',
            headerName: 'Carro importado? 1 - Sim, 0 - Não',
            type: 'number',
            width: 250
        },
        {
            field: 'placa',
            headerName: 'Placa',
            width: 100
        },
        {
            field: 'preco',
            headerName: 'Preço',
            width: 100
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
        karangos: [],
        isDialogOpen: false,
        deletable: null,
        isSnackOpen: false,
        snackMessage: '',
        isError: false
    })
    const {karangos, isDialogOpen, deletable, isSnackOpen, 
        snackMessage, isError} = state

    function getData(otherState = state) {
        // usando axios para acessar a API remota e obter os dados
        axios.get('https://api.faustocintra.com.br/karangos').then(
            // callback para o caso de sucesso
            response => setState({...otherState, karangos: response.data})
            // setState é a função que
            // atualiza as variáveis de estado
        )
    }

    React.useEffect(() => {

        getData()

    }, [])  // vetor de dependências vazio => useEffect() será
            // executado apenas uma vez, durante o carregamento (montagem)
            // do componente

    function handleDialogClose(answer) {
        setState({...state, isDialogOpen: false})

        if(answer) { // resposta positiva         

            // usa o axios para enviar uma instrução de exclusão
            // à API de back-end
            axios.delete(`https://api.faustocintra.com.br/karangos/${deletable}`)
            .then ( 
                // Callback caso dê certo
                // 1) Exibir uma mensagem de feedback positivo para o usuário
                () => {
                    const newState = ({ 
                        ...state,
                        isSnackOpen: true, // exibe a snackbar
                        snackMessage: 'Item excluído com sucesso',
                        isDialogOpen: false,
                        isError: false
                    })

                         // 2) Recarregar os dados da lista
                         getData(newState)
                }
            )
            .catch(
                // Callbck caso dê errado
                error => {
                    // 1) Exibir uma mensagem de feedback de erro para o usuário
                    setState({
                        ...state,
                        isSnackOpen: true,
                        snackMessage: 'ERRO: não foi possível excluir. ' + error.message,
                        isDialogOpen: false,
                        isError: true
                    })
                }

            )
        }
    }

    function handleDeleteClick(id) {
        // abre a caixa de diálogo de confirmação e
        // guarda o id do registro a ser excluido,
        // caso a resposta seja positiva
        setState({...state, isDialogOpen: true, deletable: id})
    }

    function handleSnackClose(event, reason) {
        // Evita que o snackbar seja fechado clicando-se fora dele
        if(reason === 'clickaway') return

        // fechamento em condições normais
        setState({...state, isSnackOpen: false})
    }

    return (
        <>
            <h1>Listagem de Carros</h1>

            <ConfirmDialog
                title="ATENÇÃO: operação irreversível"
                open={isDialogOpen}
                onClose={handleDialogClose}
            >
                Deseja realmente excluir esse item?
            </ConfirmDialog>

            <Snackbar
                open={isSnackOpen}
                autoHideDuration={6000} // após 6seg fecha a caixa de dialogo
                onClose={handleSnackClose}
                message={snackMessage}
                action={
                  <Button color="secondary" size="small" onClick={handleSnackClose}>
                     {isError ? 'Que pena!' : 'Entendi'}
                  </Button>
                }
            />
            <Paper elevation={4}>
                <DataGrid
                className={classes.dataGrid}
                    rows={karangos}
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