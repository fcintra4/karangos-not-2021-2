import * as React from 'react'
import TextField from '@mui/material/TextField'
import { makeStyles } from '@mui/styles';
import InputMask from 'react-input-mask'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import ptLocale from 'date-fns/locale/pt-BR';
import MenuItem from '@mui/material/MenuItem'

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

    {/*Variaveis de estado:*/}
    const [state, setState] = React.useState({
        cliente: {},    //Objeto Vazio 
    })

const { cliente } = state

function handleInputChange(event, field = event.target.id) {
    //Depuração
    console.log({event})

    //Preenche a variavel de estado "cliente" com os valores dos inputs
    const newCliente = {...cliente}

    if(field === 'data_nascimento') newCliente[field] = event
    else  newCliente[field] = event.target.value

    setState({...state, cliente: newCliente})
}

 
    return (
        <>
        <h1>Cadastar Novo Cliente</h1>
        <form className={classes.form}>
        <TextField
            id="nome"
            label="Nome completo" 
            variant="filled" 
            value={cliente.nome}
            required //informa que é obrigatório
            fullWidth
            placeholder="Informe o nome completo do cliente"
            onChange={handleInputChange}
        />

        <InputMask
        /*Só aceita digitação de numeros no CPF*/
        mask="999.999.999-99"
        value={cliente.cpf}
        onChange={handleInputChange}
        >
            {
                () =>
                    <TextField
                        id="cpf"
                        label="CPF" 
                        variant="filled" 
                        required //informa que é obrigatório
                        fullWidth
                        placeholder="Informe o cpf do cliente"
                    />
            }        
        </InputMask>

        <TextField
            id="rg"
            label="Doc. Identidade" 
            variant="filled" 
            value={cliente.rg}
            required //informa que é obrigatório
            fullWidth
            placeholder="Informe o documento de identidade do cliente"
            onChange={handleInputChange}
        />

        <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptLocale}> {/*formato brasileiro de horario = ptLocale*/}
            <DatePicker
                label="Data de nascimento"
                value={cliente.data_nascimento}
                onChange={event => handleInputChange(event, 'data_nascimento')}
                renderInput={(params) => <TextField 
                    {...params} 
                    id="data_nascimento"
                    variant="filled"
                    fullWidth
                  />
                }
            />
        </LocalizationProvider>

        <TextField
            id="logradouro"
            label="Logradouro" 
            variant="filled" 
            value={cliente.logradouro}
            required //informa que é obrigatório
            fullWidth
            placeholder="Rua, avenida, etc."
            onChange={handleInputChange}
        />

        <TextField
            id="num_imovel"
            label="Número" 
            variant="filled" 
            value={cliente.num_imovel}
            required //informa que é obrigatório
            fullWidth
            onChange={handleInputChange}
        />

        <TextField
            id="complemento"
            label="Complemento" 
            variant="filled" 
            value={cliente.complemento}
            fullWidth
            placeholder="Apartamento, bloco, etc. (Se necessário)"
            onChange={handleInputChange}
        />

        <TextField
            id="bairro"
            label="Bairro" 
            variant="filled" 
            value={cliente.bairro}
            required //informa que é obrigatório
            fullWidth
            onChange={handleInputChange}
        />

        <TextField
            id="municipio"
            label="Municipio" 
            variant="filled" 
            value={cliente.municipio}
            required //informa que é obrigatório
            fullWidth
            onChange={handleInputChange}
        />

        <TextField
            id="uf"
            label="UF" 
            variant="filled" 
            value={cliente.uf}
            required //informa que é obrigatório
            fullWidth
            onChange={event => handleInputChange(event, 'uf')}
            select
        >
            {
                unidadesFed.map(uf => ( //.map => percorre cada item do vetor e faz alguma coisa com cada item, resultando em outro vetor do mesmo tamanho que o original
                    <MenuItem key={uf.sigla} value={uf.sigla}>
                        {uf.nome}
                    </MenuItem>
                ))
            }
        </TextField>

        <InputMask
        mask="(99) ?9999-9999"
        formatChars={formatChars}
        value={cliente.telefone}
        onChange={handleInputChange}
        >
            {
                () =>
                    <TextField
                        id="telefone"
                        label="Telefone" 
                        variant="filled" 
                        required //informa que é obrigatório
                        fullWidth
                        placeholder="Informe o telefone do cliente"
                    />
            }        
        </InputMask>

        <TextField
            id="email"
            label="E-mail" 
            variant="filled" 
            value={cliente.email}
            required //informa que é obrigatório
            fullWidth
            onChange={handleInputChange}
        />

        </form>
        <div>
            {JSON.stringify(cliente)}
        </div>
        </>
    )
}