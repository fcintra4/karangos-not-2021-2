import * as React from 'react'
import TextField from '@mui/material/TextField'
import { makeStyles } from '@mui/styles'
import InputMask from 'react-input-mask'

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
  }
}))

export default function ClientesForm() {

  const classes = useStyles()

  const [state, setState] = React.useState({
    cliente: {} // Obj vazio
  })
  const { cliente } = state

  function handleInputChange(event) {
    // Depuração
    console.log({event})

    // Preenche a variável de estado "cliente" com os valores do input
    const newCliente = {...cliente}
    newCliente[event.target.id] = event.target.value
    setState({...state, cliente: newCliente})
  }

  return (
    <>
      <h1>Cadastrar novo cliente</h1>
      <form className={classes.form}>

        <TextField 
          id="nome" 
          label="Nome completo" 
          variant="filled" 
          value={cliente.nome}
          required
          fullWidth
          placeholder="Informe o nome completo do cliente"
          onChange={handleInputChange}
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
          />
          }
        </InputMask>

      </form>
      <div>
        {JSON.stringify(cliente)}
      </div>
    </>
  )
}