import * as React from 'react';
import InputMask from 'react-input-mask';
import { useNavigate } from 'react-router-dom';

import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import validator from 'validator';
import axios from 'axios';

import ConfirmDialog from '../ui/ConfirmDialog';

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles(theme => ({
  form: {
    maxWidth: '80%',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    '& .MuiFormControl-root': {
      minWidth: '200px',
      maxWidth: '500px',
      marginBottom: '24px',
    },
  },
  toolbar: {
    width: '100%',
    justifyContent: 'space-around',
  },
}));

const optionsImportado = [
  { value: '0', nome: 'Não' },
  { value: '1', nome: 'Sim' },
];

export default function KarangosForm() {
  const navigate = useNavigate();
  const classes = useStyles();

  const [state, setState] = React.useState({
    karango: {},
    errors: {},
    isFormValid: false,
    isSnackOpen: false,
    snackMessage: '',
    isServerError: false,
    sendBtnLabel: 'Enviar',
    isDialogOpen: false,
    date: '',
  });
  const {
    karango,
    errors,
    isFormValid,
    isSnackOpen,
    snackMessage,
    isServerError,
    sendBtnLabel,
    isDialogOpen,
  } = state;

  function handleInputChange(event, field = event.target.id) {
    // Preenche a variável de estado "karango" com os valores dos inputs
    const newKarango = { ...karango };

    if (field === 'placa') newKarango[field] = event.target.value.toUpperCase();
    else newKarango[field] = event.target.value;

    // Chama a validação do formulário
    const newErrors = formValidate(newKarango);
    const newIsFormValid = Object.keys(newErrors).length === 0; // Sem erros

    setState({
      ...state,
      karango: newKarango,
      errors: newErrors,
      isFormValid: newIsFormValid,
    });
  }

  function formValidate(fields) {
    const newErrors = {};

    if (
      !fields.marca ||
      !validator.isAlpha(fields.marca.trim(), 'pt-BR', { ignore: ' ' }) ||
      !validator.isLength(fields.marca.trim(), { min: 3, max: 255 })
    ) {
      newErrors.marca = 'Campo não preenchido ou inválido';
    }

    if (
      !fields.modelo ||
      !validator.isAlpha(fields.modelo.trim(), 'pt-BR', { ignore: ' ' }) ||
      !validator.isLength(fields.modelo.trim(), { min: 3, max: 255 })
    ) {
      newErrors.modelo = 'Campo não preenchido ou inválido';
    }

    if (
      !fields.cor ||
      !validator.isAlpha(fields.cor.trim(), 'pt-BR', { ignore: ' ' }) ||
      !validator.isLength(fields.cor.trim(), { min: 3, max: 255 })
    ) {
      newErrors.cor = 'Campo não preenchido ou inválido';
    }

    if (!fields.ano_fabricacao) {
      newErrors.ano_fabricacao = 'Campo não preenchido ou inválido';
    }

    if (!fields.importado) {
      newErrors.importado = 'Campo não preenchido ou inválido';
    }

    // Funciona apenas se for o primeiro campo a ser preenchido, se não
    // volta TypeError: Expected a string but received a undefined
    // if (!validator.matches(fields.placa, /[a-zA-Z]{3}-?[0-9]{4}/)) {
    //   newErrors.placa = 'Campo não preenchido ou inválido';
    // }

    if (!fields.preco || !validator.isNumeric(fields.preco)) {
      newErrors.preco = 'Campo não preenchido ou inválido';
    }

    return newErrors;
  }

  function handleSubmit(event) {
    // Evita o recarregamento da página após o envio do formulário
    event.preventDefault();

    // Salva os dados no servidor se o formulário estiver válido
    if (isFormValid) saveData();
  }

  function isFormTouched() {
    // Percorrer o objeto "karango" para ver se houve alteração nos campos do formulário
    for (let field in karango) {
      // Há pelo menos um campo com conteúdo
      if (karango[field] !== '') return true;
    }

    return false;
  }

  function saveData() {
    // Muda o texto do botão de enviar e o desabilita, para evitar envios repetidos
    setState({ ...state, sendBtnLabel: 'Enviando...' });

    axios
      .post('https://api.faustocintra.com.br/Karangos', karango)
      .then(
        // Callback se der certo
        () => {
          setState({
            ...state,
            isSnackOpen: true,
            snackMessage: 'Dados salvos com sucesso.',
            isServerError: false,
            sendBtnLabel: 'Enviar',
          });
        }
      )
      .catch(
        // Callback se der errado
        (error) => {
          setState({
            ...state,
            isSnackOpen: true,
            snackMessage: `ERRO: ${error.message}`,
            isServerError: true,
            sendBtnLabel: 'Enviar',
          });
        }
      );
  }

  function handleSnackClose(event, reason) {
    // Evita que o snackbar seja fechado clicando-se fora dele
    if (reason === 'clickaway') return;

    // Fechamento em condições normais
    setState({ ...state, isSnackOpen: false });

    // Quando não há erro de servidor, após o fechamento do snackbar
    // retornamos ao componente de listagem
    if (!isServerError) navigate('/Karangos');
  }

  function handleDialogClose(answer) {
    // Se o usuário responder OK à pergunta, volta
    // para a página anterior (mesmo perdendo dados)
    if (answer) navigate(-1);

    setState({ ...state, isDialogOpen: false }); // Fecha a caixa de diálogo
  }

  function handleBackBtnClick() {
    // Se o formulário estiver alterado, é necessário
    // perguntar se o usuário realmente quer voltar
    if (isFormTouched()) setState({ ...state, isDialogOpen: true });
    // Senão, pode voltar direto
    else navigate(-1);
  }

  return (
    <>
      <h1>Cadastrar novo karango</h1>
      <Snackbar
        open={isSnackOpen}
        autoHideDuration={6000}
        onClose={handleSnackClose}
        message={snackMessage}
        action={
          <Button color="secondary" size="small" onClick={handleSnackClose}>
            {isServerError ? 'Que pena!' : 'Entendi'}
          </Button>
        }
      />
      <ConfirmDialog
        title="ATENÇÃO: possível perda de dados"
        open={isDialogOpen}
        onClose={handleDialogClose}
      >
        Há dados ainda não salvos. Deseja realmente voltar?
      </ConfirmDialog>

      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          id="marca"
          label="Marca"
          variant="filled"
          value={karango.marca}
          required
          fullWidth
          placeholder="Informe a marca do carro"
          onChange={handleInputChange}
          helperText={errors?.marca}
          error={errors?.marca}
        />

        <TextField
          id="modelo"
          label="Modelo"
          variant="filled"
          value={karango.modelo}
          required
          fullWidth
          placeholder="Informe o modelo do carro"
          onChange={handleInputChange}
          helperText={errors?.modelo}
          error={errors?.modelo}
        />

        <TextField
          id="cor"
          label="Cor"
          variant="filled"
          value={karango.cor}
          required
          fullWidth
          placeholder="Informe a cor do carro"
          onChange={handleInputChange}
          helperText={errors?.cor}
          error={errors?.cor}
        />

        <InputMask
          mask="9999"
          value={karango.ano_fabricacao}
          type="number"
          onChange={handleInputChange}
        >
          {() => (
            <TextField
              id="ano_fabricacao"
              label="Ano de fabricação"
              variant="filled"
              required
              fullWidth
              placeholder="Informe o ano de fabricação"
            />
          )}
        </InputMask>

        {/* Insere o valor correto na tabela mas congela em "1969" no display */}
        {/* <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptLocale}>
          <DatePicker
            label="Ano de fabricação"
            value={karango.ano_fabricacao}
            views={['year']}
            onChange={(event) => handleInputChange(event.getFullYear(), 'ano_fabricacao')}
            renderInput={(params) => (
              <TextField
                {...params}
                id="ano_fabricacao"
                variant="filled"
                fullWidth
                helperText={errors?.ano_fabricacao}
                error={errors?.ano_fabricacao}
              />
            )}
          />
        </LocalizationProvider> */}

        <TextField
          id="importado"
          label="Importado?"
          variant="filled"
          value={karango.importado}
          fullWidth
          required
          placeholder="Carro importado?"
          onChange={(event) => handleInputChange(event, 'importado')}
          select
          helperText={errors?.importado}
          error={errors?.importado}
        >
          {optionsImportado.map((val) => (
            <MenuItem key={val.nome} value={val.value}>
              {val.nome}
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
              label="Placa"
              variant="filled"
              required
              fullWidth
              placeholder="Informe a placa do carro"
              onChange={handleInputChange}
              helperText={errors?.placa}
              error={errors?.placa}
            />
          )}
        </InputMask>

        <TextField
          id="preco"
          label="Preço"
          variant="filled"
          value={karango.preco}
          type="number"
          required
          fullWidth
          placeholder="Informe o preço do carro"
          onChange={handleInputChange}
          helperText={errors?.preco}
          error={errors?.preco}
        />

        <Toolbar className={classes.toolbar}>
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            disabled={sendBtnLabel !== 'Enviar'}
          >
            {sendBtnLabel}
          </Button>
          <Button variant="filled" onClick={handleBackBtnClick}>
            Voltar
          </Button>
        </Toolbar>
      </form>
      <div>{JSON.stringify(karango)}</div>
      <div>{`Formulário alterado: ${isFormTouched()}`}</div>
    </>
  );
}
