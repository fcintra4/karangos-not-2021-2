import * as React from 'react';
import {TextField, MenuItem} from '@mui/material';
import { makeStyles } from '@mui/styles';
import {InputMask} from 'react-input-mask'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import ptLocale from 'date-fns/locale/pt-BR';

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
    '9': '[0-9]',
    '?': '[0-9]?'
}

export default function ClientsForm(){

    //state variables
    const [state, setState] = React.useState({
        client:{}
    });
    const {client} = state;
    const classes = useStyles()

    const handleInputChange = (event, field = event.target.id) =>{
        
        const newCLient = {...client}

        if(field == 'data_nascimento') newCLient[field] = event
        else newCLient[field] = event.target.value

        setState({...state, client: newCLient})
    }

    return (
        <>
            <h1>Cadastrar novo cliente</h1>
            <form className={classes.form}>
    
                <TextField
                    id= "name"
                    label= "Nome Completo"
                    variant="filled"
                    value={client.name}
                    required
                    fullWidth
                    placeholder="Informe o nome completo do cliente"
                    onChange={handleInputChange}
                />

                <InputMask 
                    mask="999.999.999-99"
                    value={client.cpf}
                    onChange={handleInputChange}
                >
                    {
                        () => <TextField 
                        id="cpf"
                        label="CPF"
                        variant="filled"
                        required
                        fullWidth
                        placeholder="CPF" 
                        />
                    } 
                </InputMask>

                <TextField
                    id= "cpf"
                    label= "CPF"
                    variant="filled"
                    value={client.cpf}
                    required
                    fullWidth
                    placeholder="Informe o CPF do cliente"
                    onChange={handleInputChange}
                />

                <TextField
                    id= "rg"
                    label= "RG"
                    variant="filled"
                    value={client.rg}
                    required
                    fullWidth
                    placeholder="Informe o RG do cliente"
                    onChange={handleInputChange}
                />

                <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptLocale}>
                    <DatePicker
                        label="Data de nascimento"
                        value={client.data_nascimento}
                        onChange={event => handleInputChange(event, 'data_nascimento')}
                        renderInput={(params) => <TextField
                             {...params} 
                             id="data_nascimento"
                             variant= "filled"
                             fullWidth
                        />}
                    />
                </LocalizationProvider>

                <TextField
                    id= "logradouro"
                    label= "Logradouro"
                    variant="filled"
                    value={client.logradouro}
                    required
                    fullWidth
                    placeholder="Rua, avenida, etc."
                    onChange={handleInputChange}
                />

                <TextField
                    id= "number"
                    label= "Número"
                    variant="filled"
                    value={client.num_imovel}
                    required
                    fullWidth
                    onChange={handleInputChange}
                />

                <TextField
                    id= "complemento"
                    label= "Complemento"
                    variant="filled"
                    value={client.complemento}
                    fullWidth
                    placeholder="Informe o complemento do cliente"
                    onChange={handleInputChange}
                />

                <TextField
                    id= "bairro"
                    label= "Bairro"
                    variant="filled"
                    value={client.bairro}
                    required
                    fullWidth
                    onChange={handleInputChange}
                />

                <TextField
                    id= "cidade"
                    label= "Cidade"
                    variant="filled"
                    value={client.municipio}
                    required
                    fullWidth
                    placeholder="São Paulo"
                    onChange={handleInputChange}
                />

                <TextField
                    id= "uf"
                    label= "UF"
                    variant="filled"
                    value={client.uf}
                    required
                    fullWidth
                    placeholder="São Paulo"
                    onChange={handleInputChange}
                    select
                >
                    {
                        unidadesFed.map( uf => (
                            <MenuItem key={uf.sigla} value ={uf.sigla}>
                                {uf.nome}
                            </MenuItem>
                        ))
                    }
                </TextField>
            </form>
            <div>
                    {JSON.stringify(client)}
                </div>
        </>
    )
}