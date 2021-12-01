/*

    Esta prova consiste em acrescentar um novo componente/página ao projeto Karangos.

    1. Copie este arquivo para a pasta src/routed. OK

    2. Copie o arquivo "some-cars.png" para a pasta src.

    3. Altere o arquivo "Apps.js" e adicione um novo Route, com o valor path="/". Assegure-se de que esse novo Route seja POSICIONADO ANTES de todos os outros. Faça com que o componente Startpage seja carregado pelo novo Route. Dessa forma, o componente será exibido logo no início.

    4. No componente Startpage, crie uma variável de estado de objeto contendo duas propriedades:
        - about (valor inicial: string vazia)
        - figVisible (valor inicial: false)
    Crie também as respectivas variáveis avulsas usando desestruturação. OK
    
    5. Recupere as informações de https://api.faustocintra.com.br/about/1 e armazene-as na
       propriedade da variável de estado "about".  OK

    6. Faça as modificações necessárias na tag <img> para que a imagem "some-cars.png" seja exibida.

    7. Adicione um componente Toolbar imediatamente antes da div com a imagem.

    8. Dentro da Toolbar, adicione um botão com as seguintes props:
        - cor: secondary
        - variante: contained
        - texto interno: Surpresa!

    9. Ao clicar no botão criado no passo anterior, a propriedade da variável de estado
    "figVisible" deve inverter seu valor (ou seja, de true para false ou de false para true).
    Dessa forma, a imagem da div logo abaixo será exibida se estiver oculta, e será ocutada 
    se estiver sendo exibida. Veja as imagens RESULTADO1.png e RESULTADOO2.png para referência.

    10. Aplique as classes de estilo definidas em useStyles nos lugares apropriados.

    10. Coloque os arquivos "App.js" e "Startpage.js" em um ZIP para fazer a entrega da prova.

*/

import React from 'react'
import { makeStyles } from '@mui/styles'
import axios from 'axios'

import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import img from '../some-cars.png'


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


    const [state, setState] = React.useState({
        about: '',
        figVisible: false
    })

    const { about, figVisible } = state

    React.useLayoutEffect(() => {

        axios.get(`https://api.faustocintra.com.br/about/1`)
            .then(
                response => {
                    setState({
                        ...state,
                        about: response.data


                    })
                }

            )
            .catch(
                error => {
                    setState({
                        ...state,

                    })
                }
            )


    }, [])

    function mostrarImagem() {
        //Abre caixa de dialogo de confirmação e guarda
        //o ide do registro a ser excluído, se a resposta for positiva
        if(figVisible === true) setState({ ...state, figVisible: false })
         
        else setState({ ...state, figVisible: true })
        
        
    }

    return (
        <>
            <h1>Sobre o projeto Karangos</h1>

            <div dangerouslySetInnerHTML={{ __html: about.info }} />
            <Toolbar className={classes.toolbar}>
                <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={mostrarImagem}
                    
                >
                   Surpresa!
                </Button>
            </Toolbar>
           {/*6. Faça as modificações necessárias na tag <img> para que a imagem "some-cars.png" seja exibida.*/} 
            <div className={classes.div}>
                <img className={classes.figura} src={img} alt="Carros antigos" style={{ opacity: figVisible ? '1' : '0', height: figVisible ? '591px' : '0' }} />
            </div>
        </>
    )
}