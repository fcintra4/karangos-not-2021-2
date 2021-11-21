import * as React from "react";
import axios from "axios";

import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { makeStyles } from "@mui/styles";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { useHistory } from "react-router-dom";
import ConfirmDialog from "../ui/ConfirmDialog";
import Snackbar from "@mui/material/Snackbar";

export default function KarangosList() {
  const useStyles = makeStyles((theme) => ({
    dataGrid: {
      "& .MuiDataGrid-row button": {
        visibility: "hidden",
      },
      "& .MuiDataGrid-row:hover button": {
        visibility: "visible",
      },
    },
    toolbar: {
      padding: 0,
      justifyContent: "flex-end",
      margin: "15px 0",
    },
  }));

  const columns = [
    { field: "id", headerName: "Código", width: 100, type: "number" },
    { field: "marca", headerName: "Marca", width: 250 },
    { field: "modelo", headerName: "Modelo", width: 130 },
    { field: "cor", headerName: "Cor", width: 130 },
    {
      field: "ano_fabricacao",
      headerName: "Ano de fabricação",
      width: 130,
      type: "number",
    },
    {
      field: "importado",
      headerName: "Importado?",
      width: 250,
      type: "boolean",
    },
    { field: "placa", headerName: "Placa", width: 250 },
    { field: "preco", headerName: "Preço", width: 250 },
    {
      field: "editar",
      headerName: "editar",
      width: 70,
      renderCell: (params) => (
        <IconButton
          aria-label="Editar"
          onClick={() => history.push(`/clientes/${params.id}`)}
        >
          <EditIcon></EditIcon>
        </IconButton>
      ),
    },
    {
      field: "excluir",
      headerName: "excluir",
      width: 70,
      renderCell: (params) => (
        <IconButton
          aria-label="Excluir"
          onClick={() => handleDeleteClick(params.id)}
        >
          <DeleteIcon color="error"> </DeleteIcon>
        </IconButton>
      ),
    },
  ];

  const history = useHistory();

  const classes = useStyles();

  const [state, setState] = React.useState({
    karangos: [],
    isDialogOpen: false,
    deletable: null,
    isSnackOpen: false,
    snackMessage: "",
    isError: false,
  });

  const {
    karangos,
    isDialogOpen,
    deletable,
    isSnackOpen,
    snackMessage,
    isError,
  } = state;


  function transformBoolean(i) {
    let newObjectr = i.map((i) => {

        let newObject = {
          id: i.id,
          marca: i.marca,
          modelo: i.modelo,
          cor: i.cor,
          ano_fabricacao: i.ano_fabricacao,
          importado: Boolean(Number(i.importado)),
          placa: i.placa,
          preco: i.preco + " R$",
        }
        return newObject;
      }
    );
    return newObjectr;
  }

  function getData(otherState = state) {
    axios
      .get("https://api.faustocintra.com.br/karangos")
      .then((response) =>
        setState({ ...otherState, karangos: transformBoolean(response.data) })
      );
  }

  React.useEffect(() => {
    getData();
  }, []);

  function handleDialogClose(answer) {
    setState({ ...state, isDialogOpen: false });

    if (answer) {
      axios
        .delete(`https://api.faustocintra.com.br/karangos/${deletable}`)
        .then(
          //callback se der certo

          () => {
            //1) exibir mensagem de sucesso
            const newState = {
              ...state,
              isSnackOpen: true,
              snackMessage: "Item excluido com sucesso",
              isDialogOpen: false,
              isError: false,
            };
            //2) recarregar dados da lista
            getData(newState);
          }
        )
        .catch(
          //callback se der errado
          (error) => {
            // 1) exibir mensagem de erro
            setState({
              ...state,
              isSnackOpen: true,
              snackMessage: "Erro na comunicação, não foi apagado: " + error,
              isDialogOpen: false,
              isError: true,
            });
          }
        );
    } else
      setState({
        ...state,
        isSnackOpen: true,
        snackMessage: "Ok, nao vou apagar",
        isDialogOpen: false,
        isError: false,
      });
  }

  function handleDeleteClick(id) {
    //Abre a caixa de diálago de confirmação e guarda
    //o id do registro a ser excluido, se a resposta for positiva
    setState({ ...state, isDialogOpen: true, deletable: id });
  }

  function handleSnackClose(event, reason) {
    //evita que o snackbar seja fechado clicando-se fora dele
    if (reason === "clickaway") return;

    //fechamento em condições normais
    setState({ ...state, isSnackOpen: false });
  }

  return (
    <>
      <h1>Listagem de clientes</h1>

      <ConfirmDialog
        title="ATENÇÃO: operação irreversivel"
        open={isDialogOpen}
        onClose={handleDialogClose}
      >
        Deseja realmente excluir este item?
      </ConfirmDialog>

      <Snackbar
        open={isSnackOpen}
        autoHidenDuration={6000}
        onClose={handleSnackClose}
        message={snackMessage}
        action={
          <Button color="secondary" size="small" onClick={handleSnackClose}>
            {isError ? "Que pena!" : "Entendi"}
          </Button>
        }
      />

      <Toolbar className={classes.toolbar}>
        <Button
          variant="contained"
          color="secondary"
          endIcon={<NoteAddIcon></NoteAddIcon>}
          onClick={() => history.push("karangos/new")}
        >
          Cadastrar Karango
        </Button>
      </Toolbar>
      <Paper elevation={10}>
        <DataGrid
          className={classes.dataGrid}
          rows={karangos}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
          autoHeight
          disableSelectionOnlick
        />
      </Paper>
      <div>{console.log(karangos)}</div>
    </>
  );
}
