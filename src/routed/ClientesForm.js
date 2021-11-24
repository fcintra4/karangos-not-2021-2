import * as React from "react";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import InputMask from "react-input-mask";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import ptLocale from "date-fns/locale/pt-BR";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import validator from "validator";
import { validate } from "gerador-validador-cpf";
import { isFuture as dateIsFuture, isValid as dateIsValid } from "date-fns";
import axios from "axios";
import { useHistory } from "react-router";
import ConfirmDialog from "../ui/ConfirmDialog";

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
  toolbar: {
    width: "100%",
    justifyContent: "space-around",
  },
}));

const unidadesFed = [
  { sigla: "DF", nome: "Distrito Federal" },
  { sigla: "ES", nome: "Espírito Santo" },
  { sigla: "GO", nome: "Goiás" },
  { sigla: "MS", nome: "Mato Grosso do Sul" },
  { sigla: "MG", nome: "Minas Gerais" },
  { sigla: "PR", nome: "Paraná" },
  { sigla: "RJ", nome: "Rio de Janeiro" },
  { sigla: "SP", nome: "São Paulo" },
];

const formatChars = {
  9: "[0-9]", //entrada obrigatorio
  "?": "[0-9]?", //entrada opcional
};

export default function ClientesForm() {
  const classes = useStyles();
  const history = useHistory();

  const [state, setState] = React.useState({
    cliente: {}, //Objeto vazio
    errors: {},
    isFormValid: false,
    isSnackOpen: false,
    snackMessage: "",
    isServerError: false,
    sendBtnLabel: "Enviar",
    isDialogOpen: false,
  });

  const {
    cliente,
    errors,
    isFormValid,
    isSnackOpen,
    snackMessage,
    isServerError,
    sendBtnLabel,
    isDialogOpen,
  } = state;

  function handleInputChange(event, field = event.target.id) {
    //depuração
    console.log({ event });

    //preenche a variavel cliente com os valores dos inputs
    const newCliente = { ...cliente };

    if (field === "data_nascimento") {
      newCliente[field] = event;
    } else {
      newCliente[field] = event.target.value;
    }

    const newErros = formValidate(newCliente);
    const newIsFormValid = Object.keys(newErros).length === 0;

    setState({
      ...state,
      cliente: newCliente,
      errors: newErros,
      isFormValid: newIsFormValid,
    });
  }

  function formValidate(fields) {
    const newErrors = {};
    //validação do campo nome: min 5 caracter, devendo ter pelo menos um espaço em branco entre eles
    if (
      !fields.nome ||
      !(
        validator.isLength(fields.nome.trim(), { min: 5 }) &&
        validator.contains(fields.nome.trim(), " ")
      )
    ) {
      newErrors.nome = "Informe o nome completo";
    }

    //validando o CPF: padraozin CPF
    if (!fields.cpf || !validate(fields.cpf)) {
      newErrors.cpf = "CPF inválido";
    }

    //validação do campo do "rg": no minumo 4 caractres
    if (!fields.rg || !validator.isLength(fields.rg.trim(), { min: 4 })) {
      newErrors.rg = "Doc. identidade incomppleto ou não informado";
    }

    // validação da data de nascimento: data deve ser valida e não pode ser futura

    if (
      !fields.data_nascimento ||
      !dateIsValid(fields.data_nascimento) ||
      dateIsFuture(fields.data_nascimento)
    ) {
      newErrors.data_nascimento = "Data de nascimento inválida ou no futuro";
    }

    //validação logradouro, minimo 4 caracteres
    if (
      !fields.logradouro ||
      !validator.isLength(fields.logradouro.trim(), { min: 4 })
    ) {
      newErrors.logradouro = "Logradouro muito pequeno";
    }

    //validacao numero imovel
    //validação logradouro, minimo 4 caracteres
    if (
      !fields.num_imovel ||
      !validator.isLength(fields.num_imovel.trim(), { min: 1 })
    ) {
      newErrors.num_imovel = "Preencha com o número";
    }

    //validacao bairro
    if (
      !fields.bairro ||
      !validator.isLength(fields.bairro.trim(), { min: 3 })
    ) {
      newErrors.bairro = "Bairro muito pequeno ou não informado";
    }

    //validação municipio, minimo 3
    if (
      !fields.municipio ||
      !validator.isLength(fields.municipio.trim(), { min: 3 })
    ) {
      newErrors.municipio = "Município muito pequeno ou não informado";
    }

    //validacao ud, exatamente 2 caractetes
    if (
      !fields.uf ||
      !validator.isLength(fields.uf.trim(), { min: 2, max: 2 })
    ) {
      newErrors.uf = "UF fora do padrão";
    }

    //validaão telefone, nao pode ter __
    if (!fields.telefone || validator.contains(fields.telefone, "_")) {
      newErrors.telefone = "Telefone incompleto ou não informado";
    }

    //validação email, deve ser válido
    if (!fields.email || !validator.isEmail(fields.email)) {
      newErrors.email = "Email inválido ou não informado";
    }

    return newErrors;
  }

  function handleSubmit(event) {
    // Evitar o recarregamento da página
    event.preventDefault();

    // TODO: salvar os dados no servidor se o formulario estiver válido
    if (isFormValid) saveData();
  }

  function isFormTouched() {
    //Percorrer o objeto 'cliente' para ver se houve alteração nos campos do formulario
    for (let field in cliente) {
      //Há pelo menos um campo com conteudo
      if (cliente[field] !== "") return true;
    }
    return false;
  }

  function saveData() {
    //mudar o texto do botao de enviar
    setState({ ...state, sendBtnLabel: "Enviando..." });

    axios
      .post("https://api.faustocintra.com.br/clientes", cliente)
      .then(
        //callback se der certo
        () => {
          setState({
            ...state,
            isSnackOpen: true,
            snackMessage: "Dados salvos com sucesso",
            isServerError: false,
            sendBtnLabel: "Enviar",
          });
        }
      )
      .catch(
        //callback se der errado
        (error) => {
          setState({
            ...state,
            isSnackOpen: true,
            snackMessage: "Erro: " + error.message,
            isServerError: true,
            sendBtnLabel: "Enviar",
          });
        }
      );
  }

  function handleSnackClose(event, reason) {
    //evita que o snackbar seja fechado clicando-se fora dele
    if (reason === "clickaway") return;

    //fechamento em condições normais
    setState({ ...state, isSnackOpen: false });

    //quando não há erro no servidor após o fechamento do snackbar retornamos a lista
    if (!isServerError) history.push("/clientes");
  }

  function handleDialogClose(answer) {
    //se o usuário responder ok, a pergunta volta para a página anterior, mesmo perdando dados
    if (answer) {
      history.goBack();
    }
    setState({ ...state, isDialogOpen: false });
  }

  function handleBackBtnClick() {
    if (isFormTouched()) {
      setState({ ...state, isDialogOpen: true });
    } else {
      history.goBack();
    }
  }

  return (
    <>
      <h1>Cadastro de clientes</h1>

      <ConfirmDialog
        title="ATENÇÃO: possível perda de dados"
        open={isDialogOpen}
        onClose={handleDialogClose}
      >
        Há dados não salvos, se confirmar seus dados serão perdidos
      </ConfirmDialog>

      <Snackbar
        open={isSnackOpen}
        autoHidenDuration={6000}
        onClose={handleSnackClose}
        message={snackMessage}
        action={
          <Button color="secondary" size="small" onClick={handleSnackClose}>
            {isServerError ? "Que pena!" : "Entendi"}
          </Button>
        }
      />

      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          id="nome"
          label="Nome completo"
          variant="outlined"
          value={cliente.nome}
          required
          fullWidth
          placeholder="Informe o nome completo do cliente"
          onChange={handleInputChange}
          helperText={errors?.nome}
          error={errors?.nome}
        />

        <InputMask
          mask="999.999.999-99"
          value={cliente.cpf}
          onChange={handleInputChange}
        >
          {() => (
            <TextField
              id="cpf"
              label="CPF"
              variant="outlined"
              required
              fullWidth
              placeholder="Informe o CPF do cliente"
              helperText={errors?.cpf}
              error={errors?.cpf}
            />
          )}
        </InputMask>

        <TextField
          id="rg"
          label="RG"
          variant="outlined"
          value={cliente.rg}
          required
          fullWidth
          placeholder="Informe o RG do cliente"
          onChange={handleInputChange}
          helperText={errors?.rg}
          error={errors?.rg}
        />

        <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptLocale}>
          <DatePicker
            label="Data de nascimento"
            value={cliente.data_nascimento}
            onChange={(event) => handleInputChange(event, "data_nascimento")}
            renderInput={(params) => (
              <TextField
                {...params}
                id="data_nascimento"
                variant="outlined"
                fullWidth
              />
            )}
            fullWidth
          />
        </LocalizationProvider>

        <TextField
          id="logradouro"
          label="Logradouro"
          variant="outlined"
          value={cliente.logradouro}
          required
          fullWidth
          placeholder="Informe o logradouro do cliente"
          onChange={handleInputChange}
          helperText={errors?.logradouro}
          error={errors?.logradouro}
        />

        <TextField
          id="num_imovel"
          label="Número"
          variant="outlined"
          value={cliente.num_imovel}
          required
          fullWidth
          placeholder="Informe o número"
          onChange={handleInputChange}
          helperText={errors?.num_imovel}
          error={errors?.num_imovel}
        />

        <TextField
          id="complemento"
          label="Complemento"
          variant="outlined"
          value={cliente.complemento}
          fullWidth
          placeholder="Informe o complemento"
          onChange={handleInputChange}
          helperText={errors?.complemento}
          error={errors?.complemento}
        />

        <TextField
          id="bairro"
          label="Bairro"
          variant="outlined"
          value={cliente.bairro}
          fullWidth
          required
          placeholder="Informe o bairro"
          onChange={handleInputChange}
          helperText={errors?.bairro}
          error={errors?.bairro}
        />

        <TextField
          id="municipio"
          label="Município"
          variant="outlined"
          value={cliente.municipio}
          fullWidth
          required
          placeholder="Informe o município"
          onChange={handleInputChange}
          helperText={errors?.municipio}
          error={errors?.municipio}
        />

        <TextField
          id="uf"
          label="UF"
          variant="outlined"
          value={cliente.uf}
          fullWidth
          required
          placeholder="Informe o município"
          onChange={(event) => handleInputChange(event, "uf")}
          select
          helperText={errors?.uf}
          error={errors?.uf}
        >
          {unidadesFed.map((uf) => (
            <MenuItem key={uf.sigla} value={uf.sigla}>
              {uf.nome}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          id="email"
          label="Email"
          variant="outlined"
          value={cliente.email}
          fullWidth
          required
          placeholder="Informe o Email"
          onChange={handleInputChange}
          helperText={errors?.email}
          error={errors?.email}
        />

        <InputMask
          mask="(99) ?9999-9999"
          value={cliente.telefone}
          formatChars={formatChars}
          onChange={handleInputChange}
        >
          {() => (
            <TextField
              id="telefone"
              label="Telefone"
              variant="outlined"
              fullWidth
              required
              placeholder="Informe o telefone"
              helperText={errors?.telefone}
              error={errors?.telefone}
            />
          )}
        </InputMask>

        <Toolbar className={classes.toolbar}>
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            disable={sendBtnLabel !== "Enviar"}
          >
            {sendBtnLabel}
          </Button>

          <Button variant="outlined" onClick={handleBackBtnClick}>
            Voltar
          </Button>
        </Toolbar>
      </form>
      <div>{JSON.stringify(cliente)}</div>
      <div>{JSON.stringify(errors)}</div>
      <div>{"formularioalterado " + isFormTouched()}</div>
    </>
  );
}
