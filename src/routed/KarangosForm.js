import * as React from 'react'
import TextField from '@mui/material/TextField'
import { makeStyles } from '@mui/styles'
import InputMask from 'react-input-mask'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import ptLocale from 'date-fns/locale/pt-BR';
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import validator from 'validator'
import { validate as cpfValidate } from 'gerador-validador-cpf'
import { isFuture as dateIsFuture, isValid as dateIsValid } from 'date-fns'
import axios from 'axios'
import Snackbar from '@mui/material/Snackbar'
import { useHistory } from 'react-router-dom'
import ConfirmDialog from '../ui/ConfirmDialog' 

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

const formatChars = {
  '9': '[0-9]', // Entrada obrigatória
  '?': '[0-9]?' // Entrada opcional
}

export default function ClientesForm() {

  const classes = useStyles()
  const history = useHistory()

  const [state, setState] = React.useState({
    cliente: {},   // Objeto vazio
    errors: {},
    isFormValid: false,
    isSnackOpen: false,
    snackMessage: '',
    isServerError: false,
    sendBtnLabel: 'Enviar',
    isDialogOpen: false
  })
  const { cliente, errors, isFormValid, isSnackOpen, snackMessage, 
    isServerError, sendBtnLabel, isDialogOpen } = state

  function handleInputChange(event, field = event.target.id) {
    // Depuração
    console.log(event)

    // Preenche a variável de estado "cliente"
    // com os valores dos inputs
    const newCliente = {...cliente}

    if(field === 'data_nascimento') newCliente[field] = event
    else newCliente[field] = event.target.value

    // Chama a validação do formulário
    const newErrors = formValidate(newCliente)
    const newIsFormValid = Object.keys(newErrors).length === 0  // Sem erros
    
    setState({...state, cliente: newCliente, errors: newErrors, isFormValid: newIsFormValid})
  }

  function formValidate(fields) {

    const newErrors = {}


    if(!fields.marca || !(validator.isLength(fields.marca.trim(), {min: 2}) && validator.contains(fields.marca.trim(), ""))){
      newErrors.marca = "informe a marca do karango"
    }

    if(!fields.modelo || !(validator.isLength(fields.modelo.trim(), {min: 2}) && validator.contains(fields.modelo.trim(), ""))){
      newErrors.modelo = "informe o modelo do karango"
    }

    if(!fields.importado || !(validator.isLength(fields.importado.trim(), {min: 4}) && validator.contains(fields.importado.trim(), ""))){
      newErrors.importado = "informe o país de importação do karango"
    }

    if(!fields.placa || !(validator.isLength(fields.placa.trim(), {min: 7}) && validator.contains(fields.placa.trim(), ""))){
      newErrors.placa = "informe a placa do karango"
    }

    if(!fields.preco || !(validator.isLength(fields.preco.trim(), {min: 4}) && validator.contains(fields.preco.trim(), ""))){
      newErrors.preco = "informe o preco do karango"
    }
    

    return newErrors

  }

  function handleSubmit(event) {

    // Evita o recarregamento da página após o envio do formulário
    event.preventDefault()

    // Salva os dados no servidor se o formulário estiver válido
    if(isFormValid) saveData()

  }

  function isFormTouched() {

    // Percorrer o objeto "cliente" para ver se houve alteração nos
    // campos do formulário
    for(let field in cliente) {
      // Há pelo menos um campo com conteúdo
      if(cliente[field] !== '') return true
    }

    return false

  }

  function saveData() {

    // Muda o texto do botão de enviar e o desabilita, para evitar envios repetidos
    setState({...state, sendBtnLabel: 'Enviando...'})

    axios.post('https://api.faustocintra.com.br/karangos', cliente)
    .then(
      // Callback se der certo
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
      // Callback se der errado
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
    // Evita que o snackbar seja fechado clicando-se fora dele 
    if (reason === 'clickaway') return
    
    // Fechamento em condições normais
    setState({...state, isSnackOpen: false})

    // Quando não há erro de servidor, após o fechamento do snackbar
    // retornamos ao componente de listagem
    if(!isServerError) history.push('/karangos')
  }

  function handleDialogClose(answer) {

    // Se o usuário responder OK à pergunta, volta
    // para a página anterior (mesmo perdendo dados)
    if(answer) history.goBack()

    setState({...state, isDialogOpen: false}) // Fecha a caixa de diálogo
  }

  function handleBackBtnClick() {

    // Se o formulário estiver alterado, é necessário
    // perguntar se o usuário realmente quer voltar
    if(isFormTouched()) setState({...state, isDialogOpen: true})

    // Senão, pode voltar direto
    else history.goBack()
  }

  return (
    <>
      <h1>Cadastrar novo Karango</h1>

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
          value={cliente.marca}
          required
          fullWidth
          placeholder="Informe a montadora do karango"
          onChange={handleInputChange}
          helperText={errors?.marca}
          error={errors?.marca} 
        />

        <TextField 
          id="modelo" 
          label="modelo" 
          variant="filled"
          value={cliente.modelo}
          required
          fullWidth
          placeholder="Informe o modelo do karango"
          onChange={handleInputChange}
          helperText={errors?.modelo}
          error={errors?.modelo}

        />

        <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptLocale}>
          <DatePicker
            label="Data de fabricação"
            value={cliente.ano_fabricacao}
            onChange={event => handleInputChange(event, 'ano_fabricacao')}
            renderInput={(params) => <TextField 
                {...params}
                id="ano_fabricacao"
                variant="filled"
                fullWidth
                helperText={errors?.ano_fabricacao}
                error={errors?.ano_fabricacao}
              />
            }
          />
        </LocalizationProvider>

        <TextField 
          id="importado" 
          label="Importação" 
          variant="filled"
          value={cliente.importado}
          required
          fullWidth
          placeholder="País de exportação"
          onChange={handleInputChange}
          helperText={errors?.importado}
          error={errors?.importado} 
        />

        <TextField 
          id="placa" 
          label="Placa" 
          variant="filled"
          value={cliente.placa}
          required
          fullWidth
          onChange={handleInputChange}
          helperText={errors?.placa}
          error={errors?.placa}
        />

        <TextField 
          id="preco" 
          label="Preço" 
          variant="filled"
          value={cliente.preco}
          fullWidth
          required
          placeholder="Preço do karango"
          onChange={handleInputChange} 
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

      <div>
        {JSON.stringify(cliente)}
      </div>

      <div>
        {'Formulário alterado: ' + isFormTouched()}
      </div>

    </>
  )
}