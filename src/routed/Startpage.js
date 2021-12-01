/*

    Esta prova consiste em acrescentar um novo componente/página ao projeto Karangos.

    1. Copie este arquivo para a pasta src/routed.

    2. Copie o arquivo "some-cars.png" para a pasta src.

    10. Coloque os arquivos "App.js" e "Startpage.js" em um ZIP para fazer a entrega da prova.

*/
import * as React from 'react';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import logoCars from '../some-cars.png';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button'

const useStyles = makeStyles({
    figura: {
        display: 'block',
        margin: '0 auto',
        transition: 'opacity 1s linear'
    },
    toolbar: {
        justifyContent: 'space-around'
    },
    div: {
        textAlign: 'center'
    }

})

export default function Startpage() {
    const classes = useStyles()

    /* 4. No componente Startpage, crie uma variável de estado de objeto contendo duas            propriedades:
        - about (valor inicial: string vazia)
        - figVisible (valor inicial: false)
    Crie também as respectivas variáveis avulsas usando desestruturação.*/

    const [state, setState] = React.useState({
        about: '',
        figVisible: false
    })
    const { about, figVisible } = state // Variáveis avulsas usando desestruturação
    

    /* 5. Recupere as informações de https://api.faustocintra.com.br/about/1 e armazene-as na
       propriedade da variável de estado "about".*/

    function getData(otherState = state) { // Função para capturar as informações do back end
        axios.get('https://api.faustocintra.com.br/about/1') // Usamos o axios para acessar o a API
        .then(response => setState({...otherState, about: response.data})) // Em caso de sucesso, pegar o resultado "response" e armazenar na variável de estado about
    }
    React.useEffect(() => { 
        getData()
    }, []) // Usamos o lazy initializer para que valores sejam atribuídos apenas uma vez, no carregamento (montagem) do componente. Deixando as dependências vazias.


    /* 9. Ao clicar no botão criado no passo anterior, a propriedade da variável de estado
    "figVisible" deve inverter seu valor (ou seja, de true para false ou de false para true).
    Dessa forma, a imagem da div logo abaixo será exibida se estiver oculta, e será ocutada 
    se estiver sendo exibida. Veja as imagens RESULTADO1.png e RESULTADOO2.png para referência. */

    function handleClick(){ // Criamos uma função para "manejar o click no botão"
        if (figVisible === false) { // Se o estado da variável no momento do clique for falsa, ao clicar, transformamos em true
            setState({...state, figVisible:true})
        } else { // Se o estado da variável no momento do clique for true, ao clicar, transformamos em false
            setState({...state, figVisible:false})
        }
    }

    return (
        <>
            <h1>Sobre o projeto Karangos</h1>

            <div dangerouslySetInnerHTML={{__html: about.info}} />


        {/*7. Adicione um componente Toolbar imediatamente antes da div com a imagem.

           8. Dentro da Toolbar, adicione um botão com as seguintes props:
        - cor: secondary
        - variante: contained
        - texto interno: Surpresa!
           10. Aplique as classes de estilo definidas em useStyles nos lugares apropriados.*/}

            {/* Criamos o componente <toolbar> ex07 */}
            <Toolbar className={classes.toolbar}> {/* Aqui aplicamos o estilo com classes.toolbar ex10 */}
            {/* Aqui adicionamos o botão com o <button> e adicionamos cada prop ex08 */}
            <Button 
            color= "secondary" 
            variant="contained" 
            onClick={handleClick}
            >
            Surpresa!
        </Button>
        </Toolbar>
        {/* 6. Faça as modificações necessárias na tag <img> para que a imagem "some-cars.png" seja exibida.*/}
            <div className={classes.div}>
                {/* Incluimos src={logoCars} e chamamos a imagem importada ex06*/}
                {/* Aqui aplicamos estilo com classes.figura ex10 */}
                <img className={classes.figura} src={logoCars} alt="Carros antigos" style={{opacity: figVisible ? '1' : '0', height: figVisible ? '591px': '0'}} />
            </div>
        </>
    )
}