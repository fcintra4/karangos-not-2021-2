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

        // Preenche a variável de estado "cliente"
        // com os valores dos inputs
        const newKarango = { ...karango }

        //if (field === 'data_nascimento') newCliente[field] = event
       newKarango[field] = event.target.value

        // Chama a validação do formulário
        //const newErrors = formValidate(newKarango)
        //const newIsFormValid = Object.keys(newErrors).length === 0  // Sem erros

        setState({ ...state, karango: newKarango })
    }

    /*function formValidate(fields) {

        const newErrors = {}

        // Validação do campo "nome": no mínimo 5 caracteres, devendo ter pelo
        // menos um espaço em branco entre eles
        if (!fields.nome || !(validator.isLength(fields.nome.trim(), { min: 5 })
            && validator.contains(fields.nome.trim(), ' '))) {
            newErrors.nome = 'Informe o nome completo'
        }

        // Validação do campo "cpf": deve ser válido
        if (!fields.cpf || !cpfValidate(fields.cpf)) {
            newErrors.cpf = 'CPF inválido'
        }

        // Validação do campo "rg": no mínimo, 4 caracteres
        if (!fields.rg || !validator.isLength(fields.rg.trim(), { min: 4 })) {
            newErrors.rg = 'Doc. identidade incompleto ou não informado'
        }

        // Validação do campo "data_nascimento": data deve ser válida e não pode ser futura
        if (!fields.data_nascimento || !dateIsValid(fields.data_nascimento) ||
            dateIsFuture(fields.data_nascimento)) {
            newErrors.data_nascimento = 'Data de nascimento inválida ou no futuro'
        }

        // Validação do campo "logradouro": no mínimo, 4 caracteres
        if (!fields.logradouro || !validator.isLength(fields.logradouro.trim(), { min: 4 })) {
            newErrors.logradouro = 'Logradouro incompleto ou não informado'
        }

        // Validação do campo "num_imovel": no mínimo, 1 caracter
        if (!fields.num_imovel || !validator.isLength(fields.num_imovel.trim(), { min: 1 })) {
            newErrors.num_imovel = 'Número do imóvel incompleto ou não informado'
        }

        // Validação do campo "bairro": no mínimo, 3 caracteres
        if (!fields.bairro || !validator.isLength(fields.bairro.trim(), { min: 3 })) {
            newErrors.bairro = 'Bairro incompleto ou não informado'
        }

        // Validação do campo "município": no mínimo, 3 caracteres
        if (!fields.municipio || !validator.isLength(fields.municipio.trim(), { min: 3 })) {
            newErrors.municipio = 'Município incompleto ou não informado'
        }

        // Validação do campo "uf": preenchido com EXATAMENTE 2 caracteres
        if (!fields.uf || !validator.isLength(fields.uf.trim(), { min: 2, max: 2 })) {
            newErrors.uf = 'Selecione a UF'
        }

        // Validação do campo "telefone": não pode conter caracteres de sublinhado
        // (preenchimento incompleto)
        if (!fields.telefone || validator.contains(fields.telefone, '_')) {
            newErrors.telefone = 'Telefone incompleto ou não informado'
        }

        // Validação do campo "email": deve ser válido
        if (!fields.email || !validator.isEmail(fields.email)) {
            newErrors.email = 'Email inválido ou não informado'
        }

        return newErrors

    } */

    function handleSubmit(event) {

        // Evita o recarregamento da página após o envio do formulário
        event.preventDefault()

        // Salva os dados no servidor se o formulário estiver válido
        saveData()

    }

    function isFormTouched() {
        //Percorrer o objeto "cliente" para ver se houve alteração nos]
        //campos do formulário
        for (let field in karango) {
            //Há pelo menos um campo com conteúdo
            if (karango[field] !== '') return true
        }

        return false
    }

    function saveData() {

        // Muda o texto do botão de enviar e o desabilita, para evitar envios repetidos
        setState({ ...state, sendBtnLabel: 'Enviando...' })

        axios.post('https://api.faustocintra.com.br/karangos', karango)
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
        setState({ ...state, isSnackOpen: false })

        // Quando não há erro de servidor, após o fechamento do snackbar
        // retornamos ao componente de listagem
        if (!isServerError) history.push('/karangos')
    }

    function handleDialogClose(answer) {
        //Se o usuário responder OK à perrgunta, volta
        //para a página anterior (mesmo perdendo os dados)
        if (answer) history.goBack()

        setState({ ...state, isDialogOpen: false }) //Fecha a caixa de dialogo
    }

    function handleBackBtnClick() {

        //Se o formulário estiver alterado, é necessário
        //perguntar se o usuário realmente quer voltar

        if (isFormTouched()) setState({ ...state, isDialogOpen: true })

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
                title="ATENÇÃO: possível perda de daddos"
                open={isDialogOpen}
                onClose={handleDialogClose}
            >

                Há dados ainda não salvos. Deseja realmente voltar ?
            </ConfirmDialog>

            <form className={classes.form} onSubmit={handleSubmit}>

                <TextField
                    id="marca"
                    label="Marca"
                    variant="filled"
                    value={karango.marca}
                    required
                    fullWidth
                    placeholder="Informe a Marca do Carro"
                    onChange={handleInputChange}

                />

                <TextField
                    id="modelo"
                    label="Modelo"
                    variant="filled"
                    value={karango.modelo}
                    required
                    fullWidth
                    placeholder="Informe o Modelo do carro"
                    onChange={handleInputChange}


                />


                <TextField
                    id="cor"
                    label="Cor"
                    variant="filled"
                    value={karango.cor}
                    required
                    fullWidth
                    placeholder="Informe a Cor do carro"
                    onChange={handleInputChange}

                />

                <TextField
                    id="ano_fabricacao"
                    label="Ano Fabricação"
                    variant="filled"
                    value={karango.ano_fabricacao}
                    required
                    fullWidth
                    onChange={handleInputChange}

                />

                <TextField
                    id="importado"
                    label="Importado"
                    variant="filled"
                    value={karango.importado}
                    fullWidth
                    placeholder="Informe o se o carro é importado"
                    onChange={handleInputChange}
                />

                <TextField
                    id="placa"
                    label="Placa"
                    variant="filled"
                    value={karango.placa}
                    required
                    fullWidth
                    onChange={handleInputChange}

                />

                <TextField
                    id="preco"
                    label="Preço"
                    variant="filled"
                    value={karango.preco}
                    required
                    fullWidth
                    onChange={handleInputChange}

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
                {JSON.stringify(karango)}
            </div>

            {/* 
      <div>
        {JSON.stringify(errors)}
      </div>
      */}

            <div>
                {'Formulario alterado: ' + isFormTouched()}
            </div>

        </>
    )
}