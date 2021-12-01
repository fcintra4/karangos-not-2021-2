/*
    PROVA SEMESTRE 2 => 30-11-2021

    Esta prova consiste em acrescentar um novo componente/página ao projeto Karangos.

    1. Copie este arquivo para a pasta src/routed. OK
    2. Copie o arquivo "some-cars.png" para a pasta src. OK
    3. Altere o arquivo "Apps.js" e adicione um novo Route, com o valor path="/". Assegure-se de que esse novo Route seja POSICIONADO ANTES de todos os outros. Faça com que o componente Startpage seja carregado pelo novo Route. Dessa forma, o componente será exibido logo no início. OK

    10. Coloque os arquivos "App.js" e "Startpage.js" em um ZIP para fazer a entrega da prova. OK!
*/

import React from 'react'
import { makeStyles } from '@mui/styles'
import axios from 'axios'
import cars from '../some-cars.png'
import { Button, Toolbar } from '@mui/material'

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
    
    /*4. No componente Startpage, crie uma variável de estado de objeto contendo duas propriedades:
    - about (valor inicial: string vazia)
    - figVisible (valor inicial: false)*/
    const [state, setState] = React.useState({
        about: '',   
        figVisible: false,
    })    

    //...4. Crie também as respectivas variáveis avulsas usando desestruturação.
    const { figVisible, about } = state

    /*
    5. Recupere as informações de https://api.faustocintra.com.br/about/1 e armazene-as na
       propriedade da variável de estado "about".
    */
    //Função para acessar os dados e armazená-los
    function getData(otherState = state) {   
        axios.get('https://api.faustocintra.com.br/about/1').then
        ( //Callback para o caso de sucesso
            response => setState({...otherState, about: response.data}) //armazenamento em about:
        )
    }
    // Vetor de dependencias vazio -> useEffect()
    //será executado apenas uma vez, durante o carregamento (montagem) do componenete!  
    React.useEffect(() => {
        getData()
    }, [])

    /*
    9. Ao clicar no botão criado no passo anterior, a propriedade da variável de estado
    "figVisible" deve inverter seu valor (ou seja, de true para false ou de false para true).
    */
    function click(){
        if (figVisible === true) 
        {
            setState({...state, figVisible: false})  //inverte o valor do state figVisible
        } 
        else 
        { 
            setState({...state, figVisible: true})
        }
    }  
    /*Dessa forma, a imagem da div logo abaixo será exibida se estiver oculta, e será ocutada 
    se estiver sendo exibida. Veja as imagens RESULTADO1.png e RESULTADOO2.png para referência.*/ 

    return (
        <>
            <div className={classes.div}>
                <h1>Sobre o projeto Karangos</h1>
            </div>

            <div className={classes.div} dangerouslySetInnerHTML={{__html: about.info}} />

            {/*7. Adicione um componente Toolbar imediatamente antes da div com a imagem.*/}
            <Toolbar className={classes.toolbar}>
                {/*8. Dentro da Toolbar, adicione um botão com as seguintes props:
                - cor: secondary - variante: contained - texto interno: Surpresa!*/}
                <Button
                    color="secondary"
                    variant="contained"
                    onClick={click}>
                Surpresa!
                </Button>
            </Toolbar>

            <div className={classes.div}>
            {/*6. Faça as modificações necessárias na tag <img> para que a imagem "some-cars.png" seja exibida.
            -import da img && src={} para buscar a img*/}

            {/*
            10. Aplique as classes de estilo definidas em useStyles nos lugares apropriados.
            <ToolBar>
            <img>
            <div>
            */}
                <img         
                    className={classes.figura} 
                    src={cars} 
                    style={{opacity: figVisible ? '1' : '0', height: figVisible ? '591px': '0'}} 
                />
            </div>
        </>
    )
}



