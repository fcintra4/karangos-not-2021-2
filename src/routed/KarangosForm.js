import * as React from "react";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
// import InputMask from "react-input-mask";
// import AdapterDateFns from "@mui/lab/AdapterDateFns";
// import LocalizationProvider from "@mui/lab/LocalizationProvider";
// import DatePicker from "@mui/lab/DatePicker";
// import ptLocale from "date-fns/locale/pt-BR";
// import MenuItem from "@mui/material/MenuItem";

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

// const unidadesFed = [
//   { sigla: "DF", nome: "Distrito Federal" },
//   { sigla: "ES", nome: "Espírito Santo" },
//   { sigla: "GO", nome: "Goiás" },
//   { sigla: "MS", nome: "Mato Grosso do Sul" },
//   { sigla: "MG", nome: "Minas Gerais" },
//   { sigla: "PR", nome: "Paraná" },
//   { sigla: "RJ", nome: "Rio de Janeiro" },
//   { sigla: "SP", nome: "São Paulo" },
// ];

// const formatChars = {
//   9: "[0-9]", // Entrada obrigatória
//   "?": "[0-9]?", // Entrada opcional
// };

export default function KarangosForm() {
  const classes = useStyles();

  const [state, setState] = React.useState({
    karango: {}, // Objeto vazio
  });
  const { karango } = state;

  function handleInputChange(event, field = event.target.id) {
    // Depuração
    console.log(event);

    // Preenche a variável de estado "karango"
    // com os valores dos inputs
    const newKarango = { ...karango };

    if (field === "data_nascimento") newKarango[field] = event;
    else newKarango[field] = event.target.value;

    setState({ ...state, karango: newKarango });
  }

  return (
    <>
      <h1>Cadastrar novo karango</h1>
      <form className={classes.form}>
        <TextField
          id="marca"
          label="Marca"
          variant="filled"
          value={karango.marca}
          required
          fullWidth
          placeholder="Informe a marca do karango"
          onChange={handleInputChange}
        />

        <TextField
          id="modelo"
          label="Modelo"
          variant="filled"
          value={karango.modelo}
          required
          fullWidth
          placeholder="Modelo"
          onChange={handleInputChange}
        />

        <TextField
          id="cor"
          label="Cor"
          variant="filled"
          value={karango.cor}
          required
          fullWidth
          onChange={handleInputChange}
        />

        {/* <InputMask
          mask="999.999.999-99"
          value={karango.cpf}
          onChange={handleInputChange}
        >
          {() => (
            <TextField
              id="cpf"
              label="CPF"
              variant="filled"
              required
              fullWidth
              placeholder="Informe o CPF do karango"
            />
          )}
        </InputMask> */}

        {/* <TextField
          id="rg"
          label="Doc. Identidade"
          variant="filled"
          value={karango.rg}
          required
          fullWidth
          placeholder="Informe o documento de identidade do karango"
          onChange={handleInputChange}
        />

        <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptLocale}>
          <DatePicker
            label="Data de nascimento"
            value={karango.data_nascimento}
            onChange={(event) => handleInputChange(event, "data_nascimento")}
            renderInput={(params) => (
              <TextField
                {...params}
                id="data_nascimento"
                variant="filled"
                fullWidth
              />
            )}
          />
        </LocalizationProvider> */}

        <TextField
          id="importado"
          label="Importado"
          variant="filled"
          value={karango.importado}
          fullWidth
          placeholder="Importado"
          onChange={handleInputChange}
        />

        <TextField
          id="placa"
          label="Placa"
          variant="filled"
          value={karango.placa}
          required
          fullWidth
          onChange={handleInputChange}
        />

        <TextField
          id="preco"
          label="Preço"
          variant="filled"
          value={karango.preco}
          required
          fullWidth
          onChange={handleInputChange}
        />

        {/* <TextField
          id="uf"
          label="UF"
          variant="filled"
          value={karango.uf}
          required
          fullWidth
          onChange={(event) => handleInputChange(event, "uf")}
          select
        >
          {unidadesFed.map((uf) => (
            <MenuItem key={uf.sigla} value={uf.sigla}>
              {uf.nome}
            </MenuItem>
          ))}
        </TextField> */}

        {/* <InputMask
          mask="(99) ?9999-9999"
          formatChars={formatChars}
          value={karango.telefone}
          onChange={handleInputChange}
        >
          {() => (
            <TextField
              id="telefone"
              label="Telefone"
              variant="filled"
              required
              fullWidth
              placeholder="Informe o telefone do karango"
            />
          )}
        </InputMask>

        <TextField
          id="email"
          label="E-mail"
          variant="filled"
          value={karango.email}
          required
          fullWidth
          onChange={handleInputChange}
        /> */}
      </form>

      <div>{JSON.stringify(karango)}</div>
    </>
  );
}
