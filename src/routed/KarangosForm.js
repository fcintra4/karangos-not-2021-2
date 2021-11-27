import * as React from 'react'
import TextField from '@mui/material/TextField'
import { makeStyles } from '@mui/styles'
import InputMask from 'react-input-mask'
import MenuItem from '@mui/material/MenuItem'

const useStyles = makeStyles (theme =>({
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
}))

const importados =[
    {sigla: '0', nome: 'nacional'},
    {sigla: '1', nome: 'importado'},
]

export default function KarangosForm () {

    const classes = useStyles ()

    const [state, setState] = React.useState ({
        carro: {}, // Objeto vazio
    })

    const { carro } = state

    function handleInputChange(event, field = event.target.id){
        // Depuração
        console.log(event)
        // Preenche a variável de estado "carro" com os valores dos inputs
        const newCarro = {...carro}

        if(field === 'importado') newCarro[field] = event
        else newCarro[field] = event.target.value

        newCarro[field] = event.target.value  
        setState({...state, carro: newCarro})
    }

    return (
        <>
        <h1>Cadastrar novo carro</h1>

        <form className={classes.form}>
            <TextField 
                id="marca" 
                label="Marca" 
                variant="filled" 
                value={carro.marca}
                required
                fullWidth
                placeholder="Informe a marca do carro"
                onChange={handleInputChange}
            />

            <TextField 
                id="modelo" 
                label="Modelo" 
                variant="filled" 
                value={carro.modelo}
                required
                fullWidth
                placeholder="Informe o modelo do carro"
                onChange={handleInputChange}
            />

            <TextField 
                id="cor" 
                label="Cor" 
                variant="filled" 
                value={carro.cor}
                required
                fullWidth
                placeholder="Informe a cor do carro"
                onChange={handleInputChange}
            />

            <InputMask
                mask="9999"
                value={carro.ano_fabricacao}
                onChange={handleInputChange}
            >
                {
                    () => <TextField 
                        id="ano_fabricacao" 
                        label="Ano Fabricação" 
                        variant="filled" 
                        required
                        fullWidth
                        placeholder="Informe o ano de fabricação"    
                    />
                }
            </InputMask>

            <TextField 
                id="importado" 
                label="Importado" 
                variant="filled" 
                value={carro.importado}
                required
                fullWidth
                placeholder="Informe 0 para nacional e 1 para importado"
                onChange={event => handleInputChange (event, 'importado')}
                select
            >
                {
                    importados.map(importado => (
                        <MenuItem key={importado.sigla} value={importado.sigla}>
                            {importado.nome}
                        </MenuItem>
                    ))
                } 
            </TextField>

            <TextField 
                id="placa" 
                label="Placa" 
                variant="filled" 
                value={carro.placa}
                required
                fullWidth
                placeholder="Informe a Placa do carro"
                onChange={handleInputChange}
            />

            <TextField 
                id="preço" 
                label="Preço" 
                variant="filled" 
                value={carro.preco}
                required
                fullWidth
                placeholder="Informe o preço do carro"
                onChange={handleInputChange}
            />

        </form>

        <div>
            {JSON.stringify(carro)}
        </div>
        </>
    )
}