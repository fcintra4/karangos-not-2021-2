import * as React from 'react'
import { TextField } from '@mui/material'
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



export default function ClientesForm() {

    const classes = useStyles();

    const [state, setState] = React.useState({
        cliente: {}, // Objeto vazio 
        errors: {},
        inFormValid: false

    })



    const { cliente, errors, isFormValid } = state

    function handleInputChange(event, field = event.target.id) {
        //Depuração 
        console.log({ event })
        //Preenche a variável de estado "Cliente"   
        //Com os valores dos inputs 
        const newCliente = { ...cliente }

        if (field === 'data_nascimento') newCliente[field] = event
        else newCliente[field] = event.target.value

        //chama a validação do formulario
        const newErrors = formValidate(newCliente)

        setState({ ...state, clientes: newCliente })

        newCliente[field] = event.target.value
        setState({ ...state, cliente: newCliente, errors: newErrors })
    }

    function formValidate(fields) {
        const newErrors = {}
            //Validação do campo "nome" no mínimo 5 caracteres, devendo ter pelo menos 
            //um espaço em branco entre eles
            if (!fields.nome || !(validator.isLength(fields.nome.trim(), {min: 5})
            && validator.contains(fields.nome.trim(), ' '))){
                newErrors.nome = 'Informe o nome completo'
            }

            //Validação do campo "cpf" deve ser válido
            if (!fields.cpf || !cpfValidate(fields.cpf)){
                newErrors.cpf = 'CPF inválido'
            }

            //Validação do campo RG, no mínimo 4 caracteres
            if(!fields.rg || !validator.isLength(fields.rg.trim(), {min: 4})){
                newErrors.rg = 'Doc. identidade incompleto ou não informado'
            }

            //Validação do campo "data_nascimento": data deve ser válida e não pode ser futura
            if (!fields.data_nascimento || !dateIsValid(fields.data_nascimento) || 
            dateIsFuture(fields.data_nascimento)){
                newErrors.data_nascimento = 'Data de nascimento inválida ou no futuro'
            }

            //Validação do campo "Logradouro": no mínimo, 4 caracteres
            if(!fields.logradouro || !validator.isLength(fields.logradouro.trim(), {min: 4})){
                newErrors.logradouro = 'Logradouro incompleto ou não informado'
            } 

            //Validação do campo "num_imovel": no mínimo, 1 caracter
            if(!fields.num_imovel || !validator.isLength(fields.num_imovel.trim(), {min: 1})){
                newErrors.num_imovel = 'Número do imóvel incompleto ou não informado'
            } 

             //Validação do campo "bairro": no mínimo, 3 caracteres
             if(!fields.bairro || !validator.isLength(fields.bairro.trim(), {min: 3})){
                newErrors.bairro = 'Bairro incompleto ou não informado'
            } 

            //Validação do campo "munínicipio": no mínimo, 3 caracteres
            if(!fields.municipio || !validator.isLength(fields.municipio.trim(), {min: 3})){
                newErrors.municipio = 'Município incompleto ou não informado'
            } 

            //Validação do campo "uf": preenchido com Exatamente 2 Caracteres
            if(!fields.uf || !validator.isLength(fields.uf.trim(), {min: 2, max: 2})){
                newErrors.uf = 'Selecione a UF'
            } 

            //Validação do campo "telefone": não pode conter caracteres de sublinhado
            //(preenchido incompleto)
            if(!fields.telefone || validator.contains(fields.telefone, '_')){
                newErrors.telefone = 'Telefone incompleto ou não informado'
            }

            //Validate do compo "e-mail": deve ser válido
            if(!fields.email || !validator.isEmail(fields.email)){
                newErrors.email = 'Email inválido ou não informado'
            }
            

        return newErrors

    }

    function handleSubmit(event) {
        //Evita o recarregamento da página após o envio do formulário
        event.preventDefault()

        //TODO: salvar os dados no servidor se os dados estiverem válidos
    }


    return (
        <>
            <h1>Cadastrar novo Cliente</h1> 
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
                            error={errors?.cpfS}
                        />
                    }
                </InputMask>

                {/* 

                <TextField
                    value={cliente.cpf}
                    onChange={handleInputChange}
                    id="cpf"
                    label="CPF"
                    variant="filled"
                    required
                    fullWidth
                    placeholder="Informe o CPF do cliente"
                />
                */}



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
                        label="Data de Nascimento"
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
                    required
                    fullWidth
                    placeholder="Rua, avenida, etc."
                    onChange={handleInputChange}
                />

                <TextField
                    id="num_imovel"
                    label="Número"
                    variant="filled"
                    value={cliente.num_imovel}
                    required
                    fullWidth
                    onChange={handleInputChange}
                />

                <TextField
                    id="complemento"
                    label="Complemento"
                    variant="filled"
                    value={cliente.complemento}
                    fullWidth
                    placeholder="Apartamento, bloco, etc. (se necessário)"
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
                />

                <TextField
                    id="municipio"
                    label="Municipio"
                    variant="filled"
                    value={cliente.municipio}
                    required
                    fullWidth
                    onChange={handleInputChange}
                />

                <TextField
                    id="uf"
                    label="UF"
                    variant="filled"
                    value={cliente.uf}
                    required
                    fullWidth
                    onChange={handleInputChange}
                    select
                >



                    {
                        unidadesFed.map(uf => (
                            <MenuItem key={uf.sigla} value={uf.sigla}>
                                {uf.nome}
                            </MenuItem>
                        ))
                    }
                </TextField>

                <Toolbar className={classes.toolbar}>
                    <Button
                        variant="contained"
                        color="secondary"
                        type="submit">
                        Enviar
                    </Button>
                    <Button
                        variant="outlined">
                        Voltar
                    </Button>
                </Toolbar>

            </form>
            <div>
                {JSON.stringify(cliente)}
            </div>
        </>
    )
}