import * as React from "react";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import InputMask from "react-input-mask";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import ptLocale from "date-fns/locale/pt-BR";
import MenuItem from "@mui/material/MenuItem";

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

  const [state, setState] = React.useState({
    cliente: {}, //Objeto vazio
  });
  const { cliente } = state;
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
    setState({ ...state, cliente: newCliente });
  }

  return (
    <>
      <h1>Cadastro de clientes</h1>
      <form className={classes.form}>
        <TextField
          id="nome"
          label="Nome completo"
          variant="outlined"
          value={cliente.nome}
          required
          fullWidth
          placeholder="Informe o nome completo do cliente"
          onChange={handleInputChange}
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
              placeholder="Informe o nome CPF do cliente"
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
        />

        <TextField
          id="complemento"
          label="Complemento"
          variant="outlined"
          value={cliente.complemento}
          fullWidth
          placeholder="Informe o complemento"
          onChange={handleInputChange}
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
            />
          )}
        </InputMask>

      </form>
      <div>{JSON.stringify(cliente)}</div>
    </>
  );
}
