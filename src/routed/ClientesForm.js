import * as React from 'react'
import TextField from '@mui/material/TextField'
import { makeStyles } from '@mui/styles'
import InputMask from 'react-input-mask'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import ptLocale from 'date-fns/locale/pt-BR';
import MenuItem from '@mui/material/MenuItem';
import ToolBar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import validator from 'validator'
import { validate as cpfValidate } from 'gerador-validador-cpf'
import { isFuture as dateIsFuture, isValid as dateIsValid } from 'date-fns'


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
  { sigla: 'DF', nome: 'Distrito Federal'},
  { sigla: 'ES', nome: 'Espírito Santo'},
  { sigla: 'GO', nome: 'Goiás'},
  { sigla: 'MS', nome: 'Mato Grosso do Sul'},
  { sigla: 'MG', nome: 'Minas Gerais'},
  { sigla: 'PR', nome: 'Paraná'},
  { sigla: 'RJ', nome: 'Rio de Janeiro'},
  { sigla: 'SP', nome: 'São Paulo' }
]

const formatChars = {
  '9': '[0-9]', // Entrada obrigatória
  '?': '[0-9]?' // Entrada opcional
}

export default function ClientesForm() {

  const classes = useStyles()

  const [state, setState] = React.useState({
    cliente: {}, // Obj vazio
    errors: {},
    isFormValid: false
  })
  const { cliente, errors, isFormValid } = state

  function handleInputChange(event, field = event.target.id) {
    // Depuração
    console.log(event)

    // Preenche a variável de estado "cliente" com os valores do input
    const newCliente = {...cliente}

    if(field === 'data_nascimento') newCliente[field] = event
    else newCliente[field] = event.target.value

    // Chama a validação do formulário
    const newErrors = formValidate(newCliente)

    setState({...state, cliente: newCliente, errors: newErrors})
  }

  function formValidate(fields) {

    const newErrors = {}

    // Validação do compo "nome": no minimo 5 caracteres, devendo ter pelo menos um espaço em branco entre eles
    if(!fields.nome || !(validator.isLength(fields.nome.trim(), {min: 5}) && validator.contains(fields.nome.trim(), ' '))) {
      newErrors.nome = 'Informe o nome completo'
    }

    // Validação cpf: deve ser valido
    if(!fields.cpf || !cpfValidate(fields.cpf)) {
      newErrors.cpf = 'CPF inválido'
    }

    // Validação RG: minimo 4 caracteres
    if(!fields.rg || !validator.isLength(fields.rg.trim(), {min: 4})) {
      newErrors.rg = 'Doc. identidade incompleto ou não informado'
    }

    // Validação data de nascimento: deve ser válida e não pode ser futura
    if(!fields.data_nascimento || !dateIsValid(fields.data_nascimento) || dateIsFuture(fields.data_nascimento)) {
      newErrors.data_nascimento = 'Data de nascimento inválida ou no futuro'
    }

    // Validação logradouro: minimo 4 caracteres
    if(!fields.logradouro || !validator.isLength(fields.logradouro.trim(), {min: 4})) {
      newErrors.logradouro = 'Logradouro incompleto ou não informado'
    }

    // Validação num_imovel: minimo 4 caracteres
    if(!fields.num_imovel || !validator.isLength(fields.num_imovel.trim(), {min: 1})) {
      newErrors.num_imovel = 'Número do imóvel incompleto ou não informado'
    }

    // Validação bairro: minimo 3 caracteres
    if(!fields.bairro || !validator.isLength(fields.bairro.trim(), {min: 3})) {
      newErrors.bairro = 'Bairro incompleto ou não informado'
    }

    // Validação municipio: minimo 3 caracteres
    if(!fields.municipio || !validator.isLength(fields.municipio.trim(), {min: 3})) {
      newErrors.municipio = 'Município incompleto ou não informado'
    }

    // Validacão UF: exatamente 2 caracteres
    if(!fields.uf || !validator.isLength(fields.uf.trim(), {min: 2, max: 2})) {
      newErrors.uf = 'Selecione a UF'
    }

    // Validação do campo telefone: nao pode conter caracteres de sublinhado (preencimento incompleto)
    if(!fields.telefone || validator.contains(fields.telefone, '_')) {
      newErrors.telefone = 'Telefone incompleto ou não informado'
    }

    // Validação do campo email: deve ser válido
    if(!fields.email || !validator.isEmail(fields.email)) {
      newErrors.email = 'E-mail inválido ou não informado'
    }

    return newErrors
  }

  function handleSubmit(event) {

    // Evita o recarregamento da página após o envio do formulário
    event.preventDefault()

    // TODO: salvar os dados no servidor se os dados estiverem válidos

  }

  return (
    <>
      <h1>Cadastrar novo cliente</h1>
      <form className={classes.form} onSubmit={handleSubmit}>

        <TextField 
          id="nome" 
          label="Nome completo" 
          variant="filled" 
          value={cliente.nome}
          required
          fullWidth
          placeholder="Informe o nome completo do cliente"
          onChange={handleInputChange}
          helperText={errors?.nome}
          error={errors?.nome}
        />

        <InputMask // Máscara para forçar o usuário a escrever o CPF com apenas números e no formato correto
          mask="999.999.999-99"
          value={cliente.cpf}
          onChange={handleInputChange}
        >
          {
            () => <TextField 
            id="cpf" 
            label="CPF" 
            variant="filled" 
            // value={cliente.cpf}
            required
            fullWidth
            placeholder="Informe o CPF do cliente"
            // onChange={handleInputChange}
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
          helperText={errors?.rg}
          error={errors?.rg}
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
              />
            }
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
          placeholder="Apartamento, bloco, etc. (se necessário)"
          onChange={handleInputChange}
          helperText={errors?.complemento}
          error={errors?.complemento}
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
          label="Município" 
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

        <TextField 
          id="email" 
          label="E-mail" 
          variant="filled" 
          value={cliente.email}
          required
          fullWidth
          onChange={handleInputChange}
          helperText={errors?.email}
          error={errors?.email}
        />

        <ToolBar className={classes.toolbar}>
          <Button
            variant="contained"
            color="secondary"
            type="submit"
          >
            Enviar
          </Button> 
          <Button variant="outlined">Voltar</Button>
        </ToolBar>

      </form>

      <div>
        {JSON.stringify(cliente)}
      </div>

      <div>
        {JSON.stringify(errors)}
      </div>
    </>
  )
}