import * as React from 'react'
import TextField from '@mui/material/TextField'
import { makeStyles } from '@mui/styles'
import InputMask from 'react-input-mask'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import ptLocale from 'date-fns/locale/pt-BR';
import MenuItem from '@mui/material/MenuItem';

import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import validator from 'validator'
import { validate as cpfValidate } from 'gerador-validador-cpf'
import { isFuture as dateIsFuture, isValid as dateIsValidate } from 'date-fns'
import axios from 'axios'
import Snackbar from '@mui/material/Snackbar'
import { useHistory } from 'react-router-dom'

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
    }
  },
  toolbar: {
    width: '100%',
    justifyContent: 'space-around'
  }
}))

const unidadesFed = [
  { sigla: 'DF', nome: 'Distrito Federal' },
  { sigla: 'ES', nome: 'Espírito Santo' },
  { sigla: 'GO', nome: 'Goiás' },
  { sigla: 'MS', nome: 'Mato Grosso do Sul' },
  { sigla: 'MG', nome: 'Minas Gerais' },
  { sigla: 'PR', nome: 'Paraná' },
  { sigla: 'RJ', nome: 'Rio de Janeiro' },
  { sigla: 'SP', nome: 'São Paulo' }
]

const formatChars = {
  '9': '[0-9]', //Entrada obrigatória
  '?': '[0-9]?' //Entrada opcional
}

export default function ClientesForm() {

  const classes = useStyles()

  const [state, setState] = React.useState({
    cliente: {},    //Objeto vazio
    errors: {},
    isFormValid: false,
    isSnackOpen: false,
    isSnackMessage: '',
    isServerError: false,
    sendBtnLabel: 'Enviar'
  })

  const { cliente, errors, isFormValid, isSnackOpen, isSnackMessage, isServerError, sendBtnLabel} = state

  function handleInputChange(event, field = event.target.id) {
    //Depuração
    console.log(event)

    //Preenche a variável de estado "Cliente" com os valores dos inputs
    const newCliente = { ...cliente }
    if (field === 'data_nascimento') newCliente[field] = event
    else newCliente[field] = event.target.value

    //Chama a validação do formulário
    const newErrors = formValidate(newCliente)

    const newIsFormValid = Object.keys(newErrors).length === 0

    setState({ ...state, cliente: newCliente, errors: newErrors, isFormValid: newIsFormValid })
  }

  function formValidate(fields) {

    const newErrors = {}

    //Validação do campo "nome": no mínimo 5 caracteres, devendo ter pelo 
    //menos um espaço embranco entre eles.
    if(!fields.nome || !validator.isLength(fields.nome.trim(), {min: 5}) && validator.contains(fields.nome.trim(), ' ')) {
      newErrors.nome = 'Informe o nome completo'
    }

    //Validação do campo "CPF": deve ser válido
    if(!fields.cpf || !cpfValidate(fields.cpf)){
      newErrors.cpf = "CPF inválido"
    }

    //Validação do campo RG: no mínimo 4 caracteres
    if(!fields.rg || !validator.inLenth(fields.rg.trim(), {min: 4})){
      newErrors.rg= 'Doc. identidade incompleto ou não informado'
    }

    // Validação do campo "data_nascimento": data deve ser válida e não pode ser futura.

    if(!fields.data_nascimento || !dateIsValidate(fields.data_nascimento) || dateIsFuture(fields.data_nascimento)) {
      newErrors.data_nascimento = 'Data de nascimento inválida ou no futuro'
    }

    //Validação do campo logradouro: no mínimo 4 caracteres
    if(!fields.logradouro || !validator.isLength(fields.rg.trim(), {min: 4})){
      newErrors.logradouro= 'Logradouro imcompleto ou não informado'
    }

    //Validação do campo num_imovel: no mínimo 1 caracteres
    if(!fields.num_imovel || !validator.isLength(fields.num_imovel.trim(), {min: 1})){
      newErrors.num_imovel= 'Número do imóvel imcompleto ou não informado'
    }

    //Validação do campo bairro: no mínimo 3 caracteres
    if(!fields.bairro || !validator.isLength(fields.bairro.trim(), {min: 3})){
      newErrors.bairro= 'Bairro imcompleto ou não informado'
    }

    //Validação do campo municipio: no mínimo 3 caracteres
    if(!fields.municipio || !validator.isLength(fields.municipio.trim(), {min: 3})){
      newErrors.municipio= 'Municipio imcompleto ou não informado'
    }

    //Validação do campo UF: preenchido exatamente com 2 caracteres
    if(!fields.uf || !validator.isLength(fields.uf.trim(), {min: 2, max: 2})){
      newErrors.uf= 'Selecione a UF'
    }

    //Validação do campo telefone: não pode conter caracteres de sublinhado(preenchimento incompleto)
    if(!fields.telefone || validator.contains(fields.telefone, '_')) {
      newErrors.telefone = 'Telefone incompleto ou inexistente'
    }

    //Validação do campo 'e-mail': deve ser válido
    if(!fields.email || !validator.isEmail(fields.email)) {
      newErrors.email = 'Email inválido ou não informado'
    }



    return newErrors
  }

  function handleSubmit(event) {

    //Evitar o recarregamento da página após o envio do formulário
    event.preventDefault()

    //TODO: salvar os dados no servidor se o formulário estiver válido
    if(isFormValid) saveData()

  }

  function saveData() {

    //Muda o botão de enviar e o desabilita, para evitar envios repetidos
    setState({...state, sendBtnLabel: 'Enviando...'})

    axios.post('https://api.faustocintra.com.br/clientes', cliente)
    .then(
      // Callback se der certo
      () => {
        ...state,
        //1) Abrir um snackbar
        isSnackOpen: true
        //2) Colocar o texto do snackbar
        snackMessage: 'Dados Salvos com sucesso',
        //3) Indicar que não houve erro de servidor (API)
        isServerError: false,
        //4) Mudar o texto do botão de envio
        sendBtnLabel: 'Enviar'

      }
    )
    .catch(
      //Callback se der errado
      error => {
        setState
        isSnackOpen: true
        snackMessage: `ERROR` + error.message
        isServerError: false,
        sendBtnLabel: 'Enviar'
      }
    )
  }


  return (
    <>
      <h1>Cadastrar novo cliente</h1>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          id="nome"
          label="Nome Completo"
          variant="filled"
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
          {
            () => <TextField
              id="cpf"
              label="CPF"
              variant="filled"
              required
              fullWidth
              placeholder="Informe o CPF do cliente"
              helperText={errors?.cpf}
              error={errors?.cpf}
            />
          }
        </InputMask>

        <TextField
          id="rg"
          label="Doc. Identidade"
          variant="filled"
          value={cliente.rg}
          required
          fullWidth
          placeholder="Informe o documento de identidade do cliente"
          onChange={handleInputChange}
        />

        <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptLocale}>
          <DatePicker
            label="Data de nascimento"
            value={cliente.data_nascimento}
            onChange={event => handleInputChange(event, 'data_nascimento')}
            renderInput={(params) => <TextField
              {...params}
              id="data_nascimento"
              variant="filled"
              fullWidth
              helperText={errors?.data_nascimento}
              error={errors?.data_nascimento}

            />}
          />
        </LocalizationProvider>

        <TextField
          id="logradouro"
          label="Logradouro"
          variant="filled"
          value={cliente.logradouro}
          required
          fullWidth
          placeholder="Rua, avenida, etc."
          onChange={handleInputChange}
          helperText={errors?.logradouro}
          error={errors?.logradouro}
        />

        <TextField
          id="num_imovel"
          label="Número"
          variant="filled"
          value={cliente.num_imovel}
          required
          fullWidth
          onChange={handleInputChange}
          helperText={errors?.num_imovel}
          error={errors?.num_imovel}
        />

        <TextField
          id="complemento"
          label="Complemento"
          variant="filled"
          value={cliente.complemento}
          fullWidth
          placeholder="Apartamento, Bloco, Ponto de referência, etc. (se necessário)"
          onChange={handleInputChange}
        />

        <TextField
          id="bairro"
          label="Bairro"
          variant="filled"
          value={cliente.bairro}
          required
          fullWidth
          onChange={handleInputChange}
          helperText={errors?.bairro}
          error={errors?.bairro}
        />

        <TextField
          id="municipio"
          label="Municipio"
          variant="filled"
          value={cliente.municipio}
          required
          fullWidth
          onChange={handleInputChange}
          helperText={errors?.municipio}
          error={errors?.municipio}
        />

        <TextField
          id="uf"
          label="UF"
          variant="filled"
          value={cliente.uf}
          required
          fullWidth
          onChange={event => handleInputChange(event, 'uf')}
          select
          helperText={errors?.uf}
          error={errors?.uf}
        >
          {
            unidadesFed.map(uf => (
              <MenuItem key={uf.sigla} value={uf.sigla}>
                {uf.nome}
              </MenuItem>
            ))
          }
        </TextField>


        <InputMask
          mask="(99)?9999-9999"
          formatChars={formatChars}
          value={cliente.telefone}
          onChange={handleInputChange}
        >
          {
            () => <TextField
              id="telefone"
              label="Telefone"
              variant="filled"
              required
              fullWidth
              placeHolder="Informe o telefone do cliente"
              helperText={errors?.telefone}
              error={errors?.telefone}
            />
          }
        </InputMask>

        <TextField
          id="e-mail"
          label="E-mail"
          variant="filled"
          value={cliente.email}
          required
          fullWidth
          onChange={handleInputChange}
          helperText={errors?.email}
          error={errors?.email}
        />

        <Toolbar>
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            disable={sendBtnLabel}         
          >
            Enviar
          </Button>
          <Button variant="outlined">Voltar</Button>

        </Toolbar>




      </form>
      <div>
        {JSON.stringify(cliente)}
      </div>

      <div>
        {JSON.stringify(errors, null, '<br>')}
      </div>
    </>
  )
}