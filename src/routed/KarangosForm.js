import * as React from 'react'
import TextField from '@mui/material/TextField'
import { makeStyles } from '@mui/styles'
import InputMask from 'react-input-mask'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import validator from 'validator'
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
    '9': '[0-9, A-Z, a-z]', // Entrada obrigatória
  }
  
const carroImportado = [
    { x: '1', y: 'Sim'},
    { x: '0', y: 'Não'},
  ]

export default function KarangosForm() {

  const classes = useStyles()
  const history = useHistory()

  const [state, setState] = React.useState({
    carro: {},   // Objeto vazio
    errors: {},
    isFormValid: false,
    isSnackOpen: false,
    snackMessage: '',
    isServerError: false,
    sendBtnLabel: 'Enviar',
    isDialogOpen: false
  })
  const { carro, errors, isFormValid, isSnackOpen, snackMessage, 
    isServerError, sendBtnLabel, isDialogOpen } = state

  function handleInputChange(event, field = event.target.id) {
    // Depuração
    console.log(event)

    // Preenche a variável de estado "carro"
    // com os valores dos inputs
    const newCarro = {...carro}

    newCarro[field] = event.target.value

    // Chama a validação do formulário
    const newErrors = formValidate(newCarro)
    const newIsFormValid = Object.keys(newErrors).length === 0  // Sem erros
    
    setState({...state, carro: newCarro, errors: newErrors, isFormValid: newIsFormValid})
  }

  function formValidate(fields) {

    const newErrors = {}

    // Validação do campo "marca": no mínimo 3 caracteres
    if(!fields.marca || !(validator.isLength(fields.marca.trim(), {min: 3}))) {
        newErrors.marca = 'Informe a marca do veículo'
      }
    // Validação do campo "modelo": no mínimo 2 caracteres
    if(!fields.modelo || !(validator.isLength(fields.modelo.trim(), {min: 2}))) {
        newErrors.modelo = 'Informe o modelo do veículo'
      }

    // Validação do campo "cor": no mínimo, 3 caracteres
    if(!fields.cor || !validator.isLength(fields.cor.trim(), {min: 3})) {
      newErrors.cor = 'Informe a cor do veículo'
    }

    // Validação do campo "ano fabricação": data deve ser válida e não pode ser futura
    if(!fields.ano_fabricacao || !validator.isLength(fields.ano_fabricacao.trim(), {min: 4, max: 4 }) ) {
      newErrors.ano_fabricacao = 'Data de fabricação inválida ou no futura'
    }

    // Validação do campo "importado": preenchido com EXATAMENTE 1 caracter
    if(!fields.importado || !validator.isLength(fields.importado.trim(), {min: 1, max: 1})) {
        newErrors.importado = 'Selecione se o veículo é importado'
      }
  
    // Validação do campo "placa": no mínimo, 4 caracteres
    if(!fields.placa || validator.contains(fields.placa, '_')) {
        newErrors.placa = 'Placa incompleta ou não informada'
      }

    // Validação do campo "preco":
    if(!fields.preco || !validator.isLength(fields.preco.trim(), {min: 4})) {
      newErrors.preco = 'Preço incompleto ou não informado'
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

    // Percorrer o objeto "CARRO" para ver se houve alteração nos
    // campos do formulário
    for(let field in carro) {
      // Há pelo menos um campo com conteúdo
      if(carro[field] !== '') return true
    }

    return false

  }
//********************************************* */
  function saveData() {

    // Muda o texto do botão de enviar e o desabilita, para evitar envios repetidos
    setState({...state, sendBtnLabel: 'Enviando...'})

    axios.post('https://api.faustocintra.com.br/karangos', carro)
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
      <h1>Cadastrar novo carro</h1>

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
          value={carro.marca}
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
          value={carro.modelo}
          required
          fullWidth
          placeholder="Informe o modelo do veículo"
          onChange={handleInputChange}
          helperText={errors?.modelo}
          error={errors?.modelo} 
        />

        <TextField 
          id="cor" 
          label="Cor do veículo" 
          variant="filled"
          value={carro.cor}
          required
          fullWidth
          placeholder="Informe a cor do veículo"
          onChange={handleInputChange}
          helperText={errors?.cor}
          error={errors?.cor} 
        />

        <TextField 
          id="ano_fabricacao" 
          label="Ano de fabricação" 
          variant="filled"
          value={carro.ano_fabricacao}
          required
          fullWidth
          placeholder="Informe o ano de fabricação do veículo"
          onChange={handleInputChange}
          helperText={errors?.ano_fabricacao}
          error={errors?.ano_fabricacao}
        />

        <TextField 
          id="importado" 
          label="Carro importado?" 
          variant="filled"
          value={carro.importado}
          required
          fullWidth
          onChange={event => handleInputChange(event, 'importado')}
          select
          helperText={errors?.importado}
          error={errors?.importado} 
        > 
          {
            carroImportado.map(importado => (
              <MenuItem key={importado.x} value={importado.x}>
                {importado.y}
              </MenuItem>
            ))
          }
        </TextField> 


        <InputMask
          mask="999-9999"
          formatChars={formatChars}
          value={carro.placa}
          onChange={handleInputChange}
        >
          {
            () => <TextField 
              id="placa" 
              label="Placa do veículo" 
              variant="filled"
              required
              fullWidth
              placeholder="Informe a placa do veículo"
              helperText={errors?.placa}
              error={errors?.placa}               
            />
          }
        </InputMask>

        <TextField 
          id="preco" 
          label="Preço do veiculo" 
          variant="filled"
          value={carro.preco}
          fullWidth
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

      <div>
        {JSON.stringify(carro)}
      </div>

      <div>
        {'Formulário alterado: ' + isFormTouched()}
      </div>

    </>
  )
}