import * as React from 'react';
import {TextField, MenuItem} from '@mui/material';
import { makeStyles } from '@mui/styles';
import InputMask from 'react-input-mask';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import ptLocale from 'date-fns/locale/pt-BR';
import CurrencyInput from 'react-currency-masked-input'


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
    CurrencyInput: {
        maxWidth: '80%',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        minWidth: '200px',
        maxWidth: '500px',
        marginBottom: '24px',
    }
}))
const formatChars = {
    '9': '[0-9]',
    '*': '[A-Za-z0-9]'
}

export default function KarangosForm(){

    //state variables
    const [state, setState] = React.useState({
        cars:{},
        amount:''
    });

    
    const {cars} = state;
    const classes = useStyles()

    const handleInputChange = (event, field = event.target.id) =>{
        
        const newCar = {...cars}

        if(field == 'ano_fabricacao') newCar[field] = event
        else newCar[field] = event.target.value

        setState({...state, cars: newCar})
    }

    return (
        <>
            <h1>Cadastrar novo carango</h1>
            <form className={classes.form}>
    
                <TextField
                    id= "marca"
                    label= "Marca"
                    variant="filled"
                    value={cars.marca}
                    required
                    fullWidth
                    placeholder="Informe a marca do carro"
                    onChange={handleInputChange}
                />

                <TextField
                    id= "modelo"
                    label= "Modelo"
                    variant="filled"
                    value={cars.modelo}
                    required
                    fullWidth
                    placeholder="Informe o modelo do carro"
                    onChange={handleInputChange}
                />

                <TextField
                    id= "cor"
                    label= "Cor"
                    variant="filled"
                    value={cars.cor}
                    required
                    fullWidth
                    placeholder="Informe a cor do carro"
                    onChange={handleInputChange}
                />

                <InputMask 
                    mask="9"
                    value={cars.importado}
                    onChange={handleInputChange}
                >
                    {
                        () => <TextField 
                        id="importado"
                        label="Importado"
                        variant="filled"
                        required
                        fullWidth
                        placeholder="Importado?" 
                        />
                    } 
                </InputMask>

                

                <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptLocale}>
                    <DatePicker
                        label="Ano de Fabricação"
                        value={cars.ano_fabricacao}
                        onChange={event => handleInputChange(event, 'ano_fabricacao')}
                        renderInput={(params) => <TextField
                             {...params} 
                             id="ano_fabricacao"
                             variant= "filled"
                             fullWidth
                        />}
                    />
                </LocalizationProvider>

                <TextField
                    id= "placa"
                    label= "Placa"
                    variant="filled"
                    value={cars.placa}
                    required
                    fullWidth
                    placeholder="Placa"
                    onChange={handleInputChange}
                />

                <CurrencyInput 
                    prefix="$ "
                    style={{    
                        width: "475px",
                        height: "30px",
                        padding: "10px",
                        display: "flex",
                        fontFamily: "Roboto , Helvetica , Arial , sans-serif",
                        fontWeight: "400px",
                        fontSize: "1rem",
                        lineHeight: "1.4375rem",
                        color: "#fff",
                        backgroundColor: "rgba(255, 255, 255, 0.09)",
                        marginBottom: "25px"
                    }}
                    id="preco"
                    label = "Valor"
                    required
                    placeholder="R$0,00"
                    value={cars.preco}
                    onChange={handleInputChange}
                />

            
            </form>
            <div>
                    {JSON.stringify(cars)}
                </div>
        </>
    )
}