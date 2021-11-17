import * as React from 'react'
import TextField from '@mui/material/TextField'
import { makeStyles } from '@mui/styles'
import InputMask from 'react-input-mask'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'

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
        cliente: {} // objeto vazio

    })

    const { cliente } = state

    function handleInputChange(event) {
        //Depuração
        console.log({event})

        //Preenche a variavel de estado "cliente"
        //com os valores dos inputs
        /*const newCliente = {...cliente}
        newCliente[event.target.id] = event.target.value
        setState({...state, cliente: newCliente})*/
        //21h15 23min da gravação

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

                <InputMask
                    mask="999.999.999-99"
                    value={cliente.cpf}
                    onChange={handleInputChange}
                >    
                {
                    () =>  <TextField 
                        id="cpf" 
                        label="CPF" 
                        variant="filled"
                        required
                        fullWidth
                        placeholder="Informe o CPF do cliente"
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

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Data de nascimento"
                        value={cliente.data_nascimento}
                        onChange={handleInputChange}
                        renderInput={(params) => <TextField
                            {...params}
                            id="data_nascimento"
                            variant="filled"
                            fullWidth    
                            />
                        }
                    />
                </LocalizationProvider>
                

            </form>
            <div>
                {JSON.stringify(cliente)}
            </div>
        </>
    )
}