import * as React from "react";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import InputMask from "react-input-mask";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import ptLocale from "date-fns/locale/pt-BR";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import axios from "axios";
import Snackbar from '@mui/material/Snackbar'

const useStyles = makeStyles((theme) => ({
  form: {
    maxWidth: "80%",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    "& .MuiFormControl-root": {
      minWidth: "200px",
      maxWidth: "500px",
      marginBottom: "24px",
    },
  },
}));

const opcoesBinarias = [
  { valor: "1", sig: "Sim" },
  { valor: "0", sig: "Não" },
];

export default function KarangosForm() {
  const classes = useStyles();

  const [state, setState] = React.useState({
    karango: {}, //Objeto vazio
    isSnackOpen: false,
    snackMessage: '',
    isError: false
  });
  const { karango, isSnackOpen, snackMessage, isError } = state;
  function handleInputChange(event, field = event.target.id) {
    //depuração
    console.log({ event });

    //preenche a variavel cliente com os valores dos inputs
    const newKarango = { ...karango };

    if (field === "importo") {
      newKarango[field] = event.target.value;
    }
    newKarango[field] = event.target.value;

    setState({ ...state, karango: newKarango });
  }

  function handleSubmit() {
    axios
      .post("https://api.faustocintra.com.br/karangos", karango)
      .then(
          setState({ ...state, isSnackOpen: true, snackMessage: 'Karango inserido ', isDialogOpen: false, isError: false })
          )
      .catch((err) => setState({ ...state, isSnackOpen: true, snackMessage: 'Erro de comunicação ' + err, isDialogOpen: false, isError: true }));
  }

  function handleSnackClose(event, reason) {
    //evita que o snackbar seja fechado clicando-se fora dele
    if (reason === 'clickaway') return

    //fechamento em condições normais
    setState({ ...state, isSnackOpen: false })
}

  return (
    <>
      <h1>Cadastro de karango</h1>
      <Snackbar
        open={isSnackOpen}
        autoHidenDuration={6000}
        onClose={handleSnackClose}
        message={snackMessage}
        action={
          <Button color="secondary" size="small" onClick={handleSnackClose}>
            {isError ? "Foda..." : "Boa"}
          </Button>
        }
      />

      <form className={classes.form}>
        <TextField
          id="marca"
          label="Marca"
          variant="outlined"
          value={karango.marca}
          required
          fullWidth
          placeholder="Informe a marca do Karango"
          onChange={handleInputChange}
        />

        <TextField
          id="modelo"
          label="Modelo"
          variant="outlined"
          value={karango.modelo}
          required
          fullWidth
          placeholder="Informe o modelo do Karango"
          onChange={handleInputChange}
        />

        <TextField
          id="cor"
          label="Cor"
          variant="outlined"
          value={karango.cor}
          required
          fullWidth
          placeholder="Informe a cor do Karango"
          onChange={handleInputChange}
        />

        <InputMask
          mask="9999"
          value={karango.ano_fabricacao}
          onChange={handleInputChange}
        >
          {() => (
            <TextField
              id="ano_fabricacao"
              label="Ano de fabricação"
              variant="outlined"
              required
              fullWidth
              placeholder="Informe o ano de fabricação"
            />
          )}
        </InputMask>

        <TextField
          id="importado"
          label="É importado?"
          variant="outlined"
          value={karango.importado}
          fullWidth
          required
          placeholder="Karango é importado?"
          onChange={(event) => handleInputChange(event, "importado")}
          select
        >
          {opcoesBinarias.map((valor) => (
            <MenuItem key={valor.sig} value={valor.valor}>
              {valor.sig}
            </MenuItem>
          ))}
        </TextField>

        <InputMask
          mask="aaa-9999"
          value={karango.placa}
          onChange={handleInputChange}
        >
          {() => (
            <TextField
              id="placa"
              label="Placa do Karango"
              variant="outlined"
              required
              fullWidth
              placeholder="Informe a palca do Karango"
            />
          )}
        </InputMask>

        <TextField
          id="preco"
          label="Preço"
          variant="outlined"
          value={karango.preco}
          required
          fullWidth
          placeholder="Informe o preço do Karango"
          onChange={handleInputChange}
        />

        <Button variant="contained" color="secondary" onClick={handleSubmit}>
          Confirmar
        </Button>
      </form>
    </>
  );
}
