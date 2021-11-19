/*
  1.Crie o arquivo KarangosList.js, duplicando ClientesList.js. OK
  2.Faça as adaptações necessárias para mostrar na listagem as informações da tabela karangos, conforme a estrutura da imagem em anexo. OK
  3.URL da API: https://api.faustocintra.com.br/karangos OK
  4.Crie as rotas e entradas de menu necessárias para acessar o novo componente de listagem. OK
  5.Quando terminar, faça um push no seu repositório.
  6.Acesse a página do seu repositório no GitHub, vá em Pull requests e clique sobre o botão New pull request. Na mensagem, COLOQUE O SEU NOME COMPLETO para permitir a identificação da sua tarefa.
  7.Serão também avaliados os commits anteriores do seu repositório.
*/

import * as React from 'react';
import axios from 'axios';

import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';
import ConfirmDialog from '../ui/ConfirmDialog';
import Snackbar from '@mui/material/Snackbar';
import Checkbox from '@mui/material/Checkbox';

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

export default function KarangosList() {

  const columns = [
    {
      field: 'id',
      headerName: 'Cód.',
      align: 'center',
      headerAlign: 'center',
      flex: true,
      disableColumnMenu: true,
      sortComparator: (n1, n2) => Number(n1) > Number(n2) ? 1 : -1
    },
    {
      field: 'marca',
      headerName: 'Marca',
      align: 'center',
      headerAlign: 'center',
      flex: true
    },
    {
      field: 'modelo',
      headerName: 'Modelo',
      align: 'center',
      headerAlign: 'center',
      flex: true
    },
    {
      field: 'cor',
      headerName: 'Cor',
      align: 'center',
      headerAlign: 'center',
      flex: true
    },
    {
      field: 'ano_fabricacao',
      headerName: 'Ano',
      align: 'center',
      headerAlign: 'center',
      flex: true,
      sortComparator: (n1, n2) => Number(n1) > Number(n2) ? 1 : -1
    },
    {
      field: 'importado',
      headerName: 'Importado?',
      align: 'center',
      headerAlign: 'center',
      flex: true,
      renderCell: params => (
        <Checkbox checked={params.value === "1"} readOnly />
      )
    },
    {
      field: 'placa',
      headerName: 'Placa',
      align: 'center',
      headerAlign: 'center',
      flex: true
    },
    {
      field: 'preco',
      headerName: 'Preço',
      align: 'center',
      headerAlign: 'center',
      flex: true,
      valueFormatter: params => (
        Number(params.value).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
      ),
      sortComparator: (n1, n2) => Number(n1) > Number(n2) ? 1 : -1
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
          onClick={() => handleDeleteClick(params.id)}
        >
          <DeleteForeverIcon color="error" />
        </IconButton>
      )
    }
  
  ];

  const classes = useStyles()

  const history = useHistory()

  const [state, setState] = React.useState({
    karangos: [],
    isDialogOpen: false, 
    deletable: null, 
    isSnackOpen: false,
    snackMessage: '',
    isError: false
  })
  const { karangos, isDialogOpen, deletable, isSnackOpen, snackMessage, isError } = state

  function getData(otherState = state) {
    // Usando o axios para acessar a API remota e obter os dados
    axios.get('https://api.faustocintra.com.br/karangos').then(   // Callback para o caso de sucesso
      response => setState({...otherState, karangos: response.data})
    )
  }

  React.useEffect(() => {

    getData()

  }, []) // Vetor de dependências vazio -> useEffect()
         // será executado apenas uma vez, durante o
         // o carregamento (montagem) do componente
  function handleDialogClose(answer) {
    setState({...state, isDialogOpen:false})

    if(answer) { // resposta positiva
      // usa o axios para enviar uma instrução de exclusão
      // à API de back-end
      axios.delete(`https://api.faustocintra.com.br/karangos/${deletable}`)
      .then(
        // callback se der certo
        () => {
          // 1) exibir uma mensagem de feedback positivo para o usuário
          const newState = ({
            ...state,
            isSnackOpen: true, // exibe snack
            snackMessage: 'Item excluído com sucesso',
            isError: false,
            isDialogOpen: false
          })

          // 2) recarregar os dados da lista
          getData(newState)
        }
        

      )
      // callback se der errado
      .catch(
        error => {
           // 1) exibir uma mensagem de feedback de erro p/ o usuário
           setState({
             ...state, 
             isSnackOpen: true,
             snackMessage: 'ERRO: não foi possível excluir.' + error.message,
             isDialogOpen: false, 
             isError: true
           })
        }
      )
    }
  }

  function handleDeleteClick(id) {
    // abre a caixa de diálogo de confirmação e guarda
    // o id do registro a ser excluído, se a resposta 
    // for positiva
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
      <h1>Listagem de Karangos</h1>

      <ConfirmDialog
        title="ATENÇÃO: operação irreversível"
        open={isDialogOpen}
        onClose={handleDialogClose}
      >
        Deseja realmente excluir este item?
      </ConfirmDialog>

      <Snackbar
        open={isSnackOpen}
        autoHideDuration={6000}
        onClose={handleSnackClose}
        message={snackMessage}
        action={
          <Button color="secondary" size="small" onClick={handleSnackClose}>
            {isError ? 'Que pena!':'Entendi'}
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