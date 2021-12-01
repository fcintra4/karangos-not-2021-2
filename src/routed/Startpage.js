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

x
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
//importando o axios
import axios from 'axios'

//importando a imagem
import imagem_some_cars from '../some-cars.png'

//importando o toolbar para adicionar antes da div da imagem
import Toolbar from '@mui/material/Toolbar';

//importando o button
import Button from '@mui/material/Button';

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

    // declarando a variável de estado de objeto, passando about como string vazia e figVisible como false
const [state, setState] = React.useState({
    about: "",
    figVisible: false
  })
  
  //declarando as variaveis avulsas usando desestruturação
const {about, figVisible} = state


//Recuperando as informações e amazenando-as no about
function getData(otherState = state) {
    // Usando o axios para acessar a API remota e obter os dados
    axios.get('https://api.faustocintra.com.br/about/1').then(   // Callback para o caso de sucesso
      response => setState({...otherState, about: response.data})
    )
  }

  React.useEffect(() => {
    getData()
  }, [])

  // function para quando precionar o button o figVisible passar de false para true e quando for true passar para false
  function handleChange(answer) {
    if(state.figVisible == false){
        setState({...state, figVisible: true})
    }
    else if(state.figVisible == true){
        setState({...state, figVisible: false})
    }
  }

    // fazendo as alterações necessárias para inserir a imagem
    // adicionando o toolbar e o button com os respectivos style
    // adicionando o onclick para chamar a function
    // adicionando as classes de estilo
    return (
        <>
            <h1>Sobre o projeto Karangos</h1>

            <div dangerouslySetInnerHTML={{__html: about.info}} />

            <Toolbar className={classes.toolbar}>
                <Button color="secondary" variant="contained" onClick={handleChange} className={classes.button}>
                    Surpresa!
                </Button>
            </Toolbar>

            <div className={classes.div}>                
                <img alt="Carros antigos" src={imagem_some_cars} style={{opacity: figVisible ? '1' : '0', height: figVisible ? '591px': '0'}} />
            </div>
        </>
    )
}