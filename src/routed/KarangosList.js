import React from "react";
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Paper, Toolbar, Button, Snackbar } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { makeStyles } from '@mui/styles';
import { useHistory } from "react-router-dom";
import ConfirmDialog from "../ui/ConfirmDialog";

const useStyles = makeStyles(theme => ({
  DataGrid: {
      '& .MuiDataGrid-cell--withRendererl button':{
          visibility: 'hidden'
      },
      '& .MuiDataGrid-cell--withRenderer:hover button':{
        visibility: 'visible'
      }
  },
  toolbar: {
      padding:0,
      justifyContent:'flex-end',
      margin: '20px 0'
  }

}))


export default function KarangosList(){

    const classes = useStyles()
    const history = useHistory()

    const columns = [
        { field: 'id', headerName: 'Cód.', width: 70 },
        { field: 'marca', headerName: 'Marca', width: 250 },
        { field: 'modelo', headerName: 'Modelo', width: 150 },
        { field: 'cor', headerName: 'Cor', width: 150},
        { field: 'ano_fabricacao', headerName: 'Ano de Fabricação', width: 160,},
        { field: 'importado', headerName: "Importado", width: 200},
        { field: 'placa', headerName: "Placa", width: 200},
        { field: 'preco', headerName: "Valor", width: 200},
        { field: 'editar', headerName: 'Editar', width:100, headerAlign: 'center', align:'center', 
          renderCell: () => (
              <IconButton aria-label="Editar">
                  <EditIcon/>
              </IconButton>
          ) },
        { field: 'excluir', headerName: 'Excluir', width:100, headerAlign: 'center', align:'center', 
          renderCell: params => (
              <IconButton 
                  aria-label="Excluir"
                  onClick={() => handleDeleteClick(params.id)}
              >
                  <DeleteIcon color="error"/>
              </IconButton>
          ) }
      ];
    const [state, setState] = React.useState({
        cars:[],
        isDialogOpen: false,
        deletable: null,
        isSnackOpen: false,
        snackMessage: '',
        isError: false
    })
    const {cars, isDialogOpen, deletable, isSnackOpen, snackMessage, isError} = state;

    function getData(otherState = state) {
        axios.get('https://api.faustocintra.com.br/karangos').then(
            response => setState({...otherState, cars: response.data})
        )
    }
      
    React.useEffect(()=> {
        getData()
    }, []);

    function handleDialogClose(answer){
        setState({...state, isDialogOpen:false})
        if(answer) {
            axios.delete(`https://api.faustocintra.com.br/karangos/${deletable}`).then(
                () => {
                    const newState = ({
                    ...state, isSnackOpen: true,
                    snackMessage: 'Item excluído com sucesso',
                    isDialogOpen: false,
                    isError:false
                    })
                
                getData(newState)
                }
            ).catch(
                error => {
                    setState({
                        ...state,
                        isSnackOpen: true,
                        snackMessage: 'Erro: Não foi possível excluir! ' + error.message,
                        isDialogOpen: false,
                        isError: true
                    })
                }
            )
        }
    }
    
    function handleDeleteClick(id){
        setState({...state, isDialogOpen:true, deletable:id})
    }


    function handleSnackClose(event, reason) {
        if (reason === 'clickaway') return
        setState({...state, isSnackOpen: false})
    }

    return (
        <>
            <h1> Lista de Carangos</h1>

            <ConfirmDialog 
                title="ATENÇÃO: Operação Irreversível"
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
                action={<Button color="secondary" size='small' onClick={handleSnackClose}>
                    {isError ? 'Que pena!' : 'Entendi'}
                </Button>}
            />
            <Toolbar className={classes.toolbar}>
                <Button 
                    variant='contained'
                    color='secondary'
                    size='large'
                    startIcon={<AddCircleIcon/>}
                    onClick={() => history.push('/karangos/new')}
                >Cadastrar novo Carango</Button>
            </Toolbar>
            <Paper elevation={4}>
                <DataGrid
                  classname={classes.DataGrid}
                  rows={cars}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  checkboxSelection
                  autoHeight
                  disableSelectionOnClick
                />
            </Paper>
        </>


    )
}