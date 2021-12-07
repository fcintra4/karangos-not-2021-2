import * as React from 'react'
import TextField from '@mui/material/TextField'
import { makeStyles } from '@mui/styles'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import ptLocale from 'date-fns/locale/pt-BR';
import MenuItem from '@mui/material/MenuItem';
import ToolBar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
//import validator from 'validator'
import { isFuture as dateIsFuture, isValid as dateIsValid, parseJSON as dateParseJSON } from 'date-fns'
import axios from 'axios'
import Snackbar from '@mui/material/Snackbar'
import { useHistory, useParams } from 'react-router-dom'
import PatrimonioList from './PatrimonioList';
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

/*
const unidadesFed = [
  { sigla: 'DF', nome: 'Distrito Federal'},
  { sigla: 'ES', nome: 'Espírito Santo'},
  { sigla: 'GO', nome: 'Goiás'},
  { sigla: 'MS', nome: 'Mato Grosso do Sul'},
  { sigla: 'MG', nome: 'Minas Gerais'},
  { sigla: 'PR', nome: 'Paraná'},
  { sigla: 'RJ', nome: 'Rio de Janeiro'},
  { sigla: 'SP', nome: 'São Paulo' }
]
*/

/*
const formatChars = {
  '9': '[0-9]', // Entrada obrigatória
  '?': '[0-9]?' // Entrada opcional
}
*/

export default function ClientesForm() {

  const classes = useStyles()
  const history = useHistory()
  const params = useParams()

  const [state, setState] = React.useState({
    equipamento: {}, // Obj vazio
    errors: {},
    isFormValid: false,
    isSnackOpen: false,
    snackMessage: '',
    isServerError: false,
    sendBtnLabel: 'Enviar',
    isDialogOpen: false,
    pageTitle: 'Cadastrar novo equipamento'
  })
  const { equipamento, errors, isFormValid, isSnackOpen, snackMessage, isServerError, sendBtnLabel, isDialogOpen, pageTitle } = state

  // React.useEffect() com vetor de dependências vazio é executado apenas 
  // na fase de carregamento (Montagem ) do componente
  React.useLayoutEffect(() => {
      // Verifica se temos o parâmetro id na rota
      if (params.id) {
          // Entra no modo edição de um registro já existente

          // 2) Carregar registro especificado na rota para edição
          axios.get(`https://api.faustocintra.com.br/clientes/${params.id}`)
              .then(
                  // Carrega os dados recebidos dentro de uma váriavel de estado "CLiente"
                  response => {
                      setState({
                          ...state,
                          equipamento: response.data,
                          pageTitle: 'Alterar dados do equipamento' // 1) Mudar o título da página


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
                          pageTitle: 'Alterar equipamento'
                      })
                  }
              )

      }
  }, [])

  function handleInputChange(event, field = event.target.id) {
    // Depuração
    console.log(event)

    // Preenche a variável de estado "cliente" com os valores do input
    const newEquipamento = {...equipamento}

    if(field === 'data_nascimento') newEquipamento[field] = event
    else newEquipamento[field] = event.target.value

    // Chama a validação do formulário
    const newErrors = formValidate(newEquipamento)
    const newIsFormValid = Object.keys(newErrors).length === 0 // sem erros

    setState({...state, equipamento: newEquipamento, errors: newErrors, isFormValid: newIsFormValid})
  }

  function formValidate(fields) {

    const newErrors = {}

    // Validação do compo "nome": no minimo 5 caracteres, devendo ter pelo menos um espaço em branco entre eles
    //if(!fields.nome || !(validator.isLength(fields.nome.trim(), {min: 5}) && validator.contains(fields.nome.trim(), ' '))) {
    //  newErrors.nome = 'Informe o nome completo'
    //}

    // Validação cpf: deve ser valido
    //if(!fields.cpf || !cpfValidate(fields.cpf)) {
    //  newErrors.cpf = 'CPF inválido'
    //}

    // Validação RG: minimo 4 caracteres
    //if(!fields.rg || !validator.isLength(fields.rg.trim(), {min: 4})) {
    //  newErrors.rg = 'Doc. identidade incompleto ou não informado'
    //}
 
    // Validação data de nascimento: deve ser válida e não pode ser futura
    if (typeof fields.data_compra === 'string') {
      fields.data_compra = dateParseJSON(fields.data_compra)
    }

    if(!fields.data_compra || !dateIsValid(fields.data_compra) || dateIsFuture(fields.data_compra)) {
      newErrors.data_compra = 'Data inválida ou no futuro'
    }

    // Validação logradouro: minimo 4 caracteres
    //if(!fields.logradouro || !validator.isLength(fields.logradouro.trim(), {min: 4})) {
    //  newErrors.logradouro = 'Logradouro incompleto ou não informado'
    //}

    // Validação num_imovel: minimo 4 caracteres
    //if(!fields.num_imovel || !validator.isLength(fields.num_imovel.trim(), {min: 1})) {
    //  newErrors.num_imovel = 'Número do imóvel incompleto ou não informado'
    //}

    // Validação bairro: minimo 3 caracteres
    //if(!fields.bairro || !validator.isLength(fields.bairro.trim(), {min: 3})) {
    //  newErrors.bairro = 'Bairro incompleto ou não informado'
    //}

    // Validação municipio: minimo 3 caracteres
    //if(!fields.municipio || !validator.isLength(fields.municipio.trim(), {min: 3})) {
    //  newErrors.municipio = 'Município incompleto ou não informado'
    //}

    // Validacão UF: exatamente 2 caracteres
    //if(!fields.uf || !validator.isLength(fields.uf.trim(), {min: 2, max: 2})) {
    //  newErrors.uf = 'Selecione a UF'
    //}

    // Validação do campo telefone: nao pode conter caracteres de sublinhado (preencimento incompleto)
    //if(!fields.telefone || validator.contains(fields.telefone, '_')) {
    //  newErrors.telefone = 'Telefone incompleto ou não informado'
    //}

    // Validação do campo email: deve ser válido
    //if(!fields.email || !validator.isEmail(fields.email)) {
    //  newErrors.email = 'E-mail inválido ou não informado'
    //}

    return newErrors
  }

  function handleSubmit(event) {

    // Evita o recarregamento da página após o envio do formulário
    event.preventDefault()

    // Salva os dados no servidor se o formulario estiverem válidos
    if(isFormValid) saveData()
  }

  function isFormTouched() {

    // Percorrer o objeto "cliente" para ver se houve alteração nos
    // campos do formulario
    for(let field in equipamento) {
      // Há pelo menos um campo com conteúdo
      if(equipamento[field] !== '') return true
    }

    return false
  }

    function saveData() {

        // Muda o texto do botão de enviar e o desabilita, para evitar envios repetidos
        setState({ ...state, sendBtnLabel: 'Enviando...' })

        function callBackOK() {
            setState({
                ...state,
                isSnackOpen: true,
                snackMessage: 'Dados salvos com sucesso.',
                isServerError: false,
                sendBtnLabel: 'Enviar'
            })
        }

        function callBackError(error) {
            setState({
                ...state,
                isSnackOpen: true,
                snackMessage: 'ERRO: ' + error.message,
                isServerError: true,
                sendBtnLabel: 'Enviar'
            })
        }

        if (params.id) {
            //Chamada de API para alteração de registro existente (verbo PUT)
            axios.put(`https://api.faustocintra.com.br/clientes/${params.id}​​​`, equipamento)
                .then(callBackOK)
                .catch(callBackError)
        } else {
            axios.post(`https://api.faustocintra.com.br/clientes`, equipamento)
                .then(callBackOK)
                .catch(callBackError)
        }


    }

  

  function handleSnackClose(event, reason) {
    // Evita que o snackbar seja fechado clicando-se fora dele
    if (reason === 'clickaway') return

    // Fechamento em condições normais
    setState({...state, isSnackOpen: false})

    // Quando nao há erro de servidor, após o fechamento do snacakbar
    // retornamos ao componente de listagem
    if(!isServerError) history.push('/clientes')
  }

  function handleDialogClose(answer) {

    // Se o usuário responder OK à pergunta, volta
    // para a página anterior (mesmo perdendo dados)
    if(answer) history.goBack()

    setState({...state, isDialogOpen: false}) // fecha a caixa de dialogo
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
      <h1>{pageTitle}</h1>

      <Snackbar
          open={isSnackOpen}
          autoHideDuration={6000}
          onClose={handleSnackClose}
          message={snackMessage}
          action={<Button color="secondary" size="small" onClick={handleSnackClose}>{isServerError ? 'Que pena!' : 'Entendi'}</Button>}
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
          id="patrimonio" 
          label="Núm. de patrimônio" 
          variant="filled" 
          value={equipamento.patrimonio}
          required
          fullWidth
          placeholder="Informe o número do patrimônio"
          onChange={handleInputChange}
          helperText={errors?.patrimonio}
          error={errors?.patrimonio}
        />

        <TextField 
          id="equipamento_nome" 
          label="Equipamento" 
          variant="filled" 
          value={equipamento.equipamento_nome}
          required
          fullWidth
          placeholder="Informe o nome do equipamento"
          onChange={handleInputChange}
          helperText={errors?.equipamento_nome}
          error={errors?.equipamento_nome}
        />

        <TextField 
          id="marca" 
          label="Marca" 
          variant="filled" 
          value={equipamento.marca}
          required
          fullWidth
          placeholder="Informe a marca"
          onChange={handleInputChange}
          helperText={errors?.marca}
          error={errors?.marca}
        />

        <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptLocale}>
          <DatePicker
            label="Data da compra"
            value={equipamento.data_compra}
            onChange={event => handleInputChange(event, 'data_compra')}
            renderInput={(params) => <TextField 
                {...params}
                id="data_compra"
                variant="filled"
                fullWidth
                helperText={errors?.data_compra}
                error={errors?.data_compra}
              />
            }
          />
        </LocalizationProvider>

        <TextField 
          id="modelo" 
          label="Modelo" 
          variant="filled" 
          value={equipamento.modelo}
          required
          fullWidth
          placeholder="Informe o modelo"
          onChange={handleInputChange}
          helperText={errors?.modelo}
          error={errors?.modelo}
        />

        <TextField 
          id="usuario" 
          label="Usuário" 
          variant="filled" 
          value={equipamento.usuario}
          required
          fullWidth
          placeholder="Informe o usuário que está com o equipamento"
          onChange={handleInputChange}
          helperText={errors?.usuario}
          error={errors?.usuario}
        />

        <TextField 
          id="departamento" 
          label="Departamento" 
          variant="filled" 
          value={equipamento.departamento}
          fullWidth
          required
          placeholder="Informe o departamento no qual se encontra o equipamento"
          onChange={handleInputChange}
          helperText={errors?.departamento}
          error={errors?.departamento}
        />

        <TextField 
          id="obs" 
          label="Observações" 
          variant="filled" 
          value={equipamento.obs}
          fullWidth
          placeholder="Observações sobre o equipamento, se necessário"
          onChange={handleInputChange}
          helperText={errors?.obs}
          error={errors?.obs}
        />

        <TextField 
          id="nf" 
          label="Nº Nota Fiscal" 
          variant="filled" 
          value={equipamento.nf}
          fullWidth
          placeholder="Número da nota fiscal"
          onChange={handleInputChange}
          helperText={errors?.nf}
          error={errors?.nf}
        />

        {/*
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
        */}

        {/*
        <InputMask // Máscara para forçar o usuário a escrever o CPF com apenas números e no formato correto
          mask="(99) ?9999-9999"
          formatChars={formatChars}
          value={cliente.telefone}
          onChange={handleInputChange}
        >
          {
            () => <TextField 
            id="telefone" 
            label="Telefone" 
            variant="filled" 
            // value={cliente.telefone}
            required
            fullWidth
            placeholder="Informe o telefone do cliente"
            // onChange={handleInputChange}
            helperText={errors?.telefone}
            error={errors?.telefone}
          />
          }
        </InputMask>
        */}

        <TextField 
          id="valor_compra" 
          label="Valor da compra" 
          variant="filled" 
          value={equipamento.valor_compra}
          required
          fullWidth
          placeholder="Informe o valor da compra"
          onChange={handleInputChange}
          helperText={errors?.valor_compra}
          error={errors?.valor_compra}
        />

        <ToolBar className={classes.toolbar}>
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            disabled={sendBtnLabel !== 'Enviar'}
          >
            {sendBtnLabel}
          </Button> 
          <Button variant="outlined" onClick={handleBackBtnClick}>Voltar</Button>
        </ToolBar>

      </form>

      <div>
        {JSON.stringify(equipamento)}
      </div>

          {/*
      <div>
        {JSON.stringify(cliente)}
      </div>

      <div>
        {'Formulário alterado: ' + isFormTouched()}
      </div>
          */}
    </>
  )
}