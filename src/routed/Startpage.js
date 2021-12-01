/*

    Esta prova consiste em acrescentar um novo componente/página ao projeto Karangos.

    1. Copie este arquivo para a pasta src/routed.

    2. Copie o arquivo "some-cars.png" para a pasta src.

    3. Altere o arquivo "Apps.js" e adicione um novo Route, com o valor path="/". Assegure-se de que esse novo Route seja POSICIONADO ANTES de todos os outros. Faça com que o componente Startpage seja carregado pelo novo Route. Dessa forma, o componente será exibido logo no início.

    4. No componente Startpage, crie uma variável de estado de objeto contendo duas            propriedades:
        - about (valor inicial: string vazia)
        - figVisible (valor inicial: false)
    Crie também as respectivas variáveis avulsas usando desestruturação.
    
    5. Recupere as informações de https://api.faustocintra.com.br/about/1 e armazene-as na
       propriedade da variável de estado "about".

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
import somecars from '../assets/some-cars.png'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import axios from 'axios'
// Importei os pacotes

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

    // Criar as variáveis de estado
    const [state, setState] = React.useState (()=> ({
        about: '',
        figVisible: false,
    }))
    // Fiz a desestruturação das variáveis de estado
    const { about, figVisible } = state

    // usei o axios com base no ClientesList para armazenar as informações da API na variável de estado
    function getData (otherState = state){
        axios.get('https://api.faustocintra.com.br/about/1').then(   // Callback para o caso de sucesso
          response => setState({...otherState, about: response.data})
        )
    }   

    React.useEffect(() => {
        getData ()
        // Usando o axios para acessar a API remota e obter os dados
    }, []) 
        // Vetor de dependências vazio -> useEffect()
        // será executado apenas uma vez, durante o
        // o carregamento (montagem) do componente

    function handleExibir () { // Função para funcionar o botão de Exibir imagem
        // se a imagem estiver escondida a pessoa clica no botão e ela aparece,
        // se a imagem estiver aparecendo a pessoa clica no botão e ela esconde.
        if (figVisible === false) { 
            setState ({
                ... state,
                figVisible: true,
            })
        }
        else {
            setState ({
                ...state,
                figVisible: false
            })
        }
    }
    
    const classes = useStyles()

    return (
        <>
            <h1>Sobre o projeto Karangos</h1>

            <div dangerouslySetInnerHTML={{__html: about.info}} />

            {/* Coloquei a Toolbar e o Button e coloquei a função handleExibir para funcionar o botão */}
            <Toolbar className={classes.toolbar}>
                <Button
                    color= 'secondary'
                    variant= 'contained'
                    onClick = {handleExibir}

                >
                    SURPRESA!
                </Button>
            </Toolbar>

            {/* Coloquei o src da imagem para aparecer a imagem */}
            <div className={classes.div}>
                <img src={somecars} alt="Carros antigos" style={{opacity: figVisible ? '1' : '0', height: figVisible ? '591px': '0'}} />
            </div>
        </>
    )
}