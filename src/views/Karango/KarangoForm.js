import * as React from 'react'
import TextField from '@mui/material/TextField'
import { makeStyles } from '@mui/styles'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import validator from 'validator'
import Snackbar from '@mui/material/Snackbar'
import { useHistory } from 'react-router-dom'
import ConfirmDialog from '../../components/ConfirmDialog'

import api from '../../service/Api';

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

export default function KarangosForm() {

  const classes = useStyles()
  const history = useHistory()

  const [state, setState] = React.useState({
    karango: {},   // Objeto vazio
    errors: {},
    isFormValid: false,
    isSnackOpen: false,
    snackMessage: '',
    isServerError: false,
    sendBtnLabel: 'Enviar',
    isDialogOpen: false
  })
  const { karango, errors, isFormValid, isSnackOpen, snackMessage, 
    isServerError, sendBtnLabel, isDialogOpen } = state

  function handleInputChange(event, field = event.target.id) {
    // Depuração
    console.log(event)

    // Preenche a variável de estado "karango"
    // com os valores dos inputs
    const newkarango = {...karango}

    newkarango[field] = event.target.value

    // Chama a validação do formulário
    const newErrors = formValidate(newkarango)
    const newIsFormValid = Object.keys(newErrors).length === 0  // Sem erros
    
    setState({...state, karango: newkarango, errors: newErrors, isFormValid: newIsFormValid})
  }

  function formValidate(fields) {
    const newErrors = {}

    if(!fields.marca || !(validator.isLength(fields.marca.trim(), {min: 2}))) {
      newErrors.marca = 'Informe a marca do veículo'
    }

    if(!fields.modelo || !validator.isLength(fields.modelo.trim(), {min: 4})) {
      newErrors.modelo = 'Informe o modelo do veículo'
    }
    

    if(!fields.cor || !validator.isLength(fields.cor.trim(), {min: 2})) {
      newErrors.cor = 'Informe a cor do veículo'
    }
    

    if(!fields.ano_fabricacao || !validator.isLength(fields.ano_fabricacao.trim(), {min: 4})) {
      newErrors.ano_fabricacao = 'Ano informado é inválido'
    }

    if(!fields.importado || !validator.isLength(fields.importado.trim(), {min: 0},  {max: 1})) {
      newErrors.importado = 'Informe de o carro é importado'
    }

    if(!fields.placa || !validator.isLength(fields.placa.trim(), {min: 8})) {
      newErrors.placa = 'Informe a placa do veículo'
    }

    if(!fields.preco || !validator.isLength(fields.preco.trim(), {min: 1})) {
      newErrors.preco = 'Informe o valor do veículo'
    }
    
    return newErrors

  }

  function handleSubmit(event) {
    event.preventDefault()

    if(isFormValid) saveData()
  }

  function isFormTouched() {
    for(let field in karango) {
      if(karango[field] !== '') return true
    }

    return false

  }

  function saveData() {
    setState({...state, sendBtnLabel: 'Enviando...'})

    api.post('/karangos', karango)
    .then(
      () => {
        setState({
          ...state,
          isSnackOpen: true,
          snackMessage: 'Dados salvos com sucesso.',
          isServerError: false,
          sendBtnLabel: 'Enviar'
        })
      }
    )
    .catch(
      error => {
        setState({
          ...state,
          isSnackOpen: true,
          snackMessage: 'ERRO: ' + error.message,
          isServerError: true,
          sendBtnLabel: 'Enviar'
        })
      }
    )
  }

  function handleSnackClose(event, reason) {
    if (reason === 'clickaway') return
    
    setState({...state, isSnackOpen: false})
    if(!isServerError) history.push('/karangos')
  }

  function handleDialogClose(answer) {
    if(answer) history.goBack()

    setState({...state, isDialogOpen: false})
  }

  function handleBackBtnClick() {
    if(isFormTouched()) setState({...state, isDialogOpen: true})

    else history.goBack()
  }

  return (
    <>
      <h1>Cadastrar novo Carro</h1>

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
          label="Marca do veículo" 
          variant="filled"
          value={karango.marca}
          required
          fullWidth
          placeholder="Informe a marca do veículo"
          onChange={handleInputChange}
          helperText={errors?.marca}
          error={errors?.marca} 
        />

        <TextField 
          id="modelo" 
          label="Modelo do veículo" 
          variant="filled"
          value={karango.modelo}
          required
          fullWidth
          placeholder="Informe o modelo do veículo"
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
          placeholder="Informe a cor do veículo"
          onChange={handleInputChange}
          helperText={errors?.cor}
          error={errors?.cor} 
        />

        <TextField 
          id="ano_fabricacao" 
          label="Ano  de Fabricacao" 
          variant="filled"
          value={karango.ano_fabricacao}
          required
          fullWidth
          placeholder="Informe o ano de fabricação do veículo"
          onChange={handleInputChange}
          helperText={errors?.ano_fabricacao}
          error={errors?.ano_fabricacao} 
        />

      <TextField 
          id="importado" 
          label="importado" 
          variant="filled"
          value={karango.importado}
          required
          fullWidth
          placeholder="Informe se  o carro é importado ou não"
          onChange={handleInputChange}
          helperText={errors?.importado}
          error={errors?.importado} 
        />

      <TextField 
          id="placa" 
          label="Placa do veículo" 
          variant="filled"
          value={karango.placa}
          required
          fullWidth
          placeholder="Informe a placa do veículo"
          onChange={handleInputChange}
          helperText={errors?.placa}
          error={errors?.placa} 
        />

      <TextField 
          id="preco" 
          label="preço do veículo" 
          variant="filled"
          value={karango.preco}
          required
          fullWidth
          placeholder="Informe o preço do veículo"
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
          <Button variant="outlined" onClick={handleBackBtnClick}>Voltar</Button>
        </Toolbar>
      
      </form>
    </>
  )
}