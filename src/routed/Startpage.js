import React from 'react'
import { makeStyles } from '@mui/styles'
//import { useParams } from 'react-router-dom'
//import axios from 'axios'
//import ToolBar from '@mui/material/Toolbar'
//import Button from '@mui/material/Button'
import carros from '../some-cars.png'

// const carros = require('../some-cars.png')

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
    //const params = useParams()
    

    const [state, setState] = React.useState ({
        about: '',
        figVisible: false,
    })

    const { about, figVisible } = state

    /*
    function estadoLogo() {

        if(figVisible === false) {
            setState({...state, figVisible:true })
        } else {
            setState({...state, figVisible: false})
        }
    }
    */

    return (
        <>
            <h1>Controle de patrimônio</h1>
            <h4>Listagem de patrimônio da empresa e cadastro de novos equipamentos, para acessar as páginas, clique sobre o menu no header.</h4>

            <div dangerouslySetInnerHTML={{__html: about.info}} />



            <div className={classes.div}>
                <img src={carros} alt="Carros antigos" style={{opacity: figVisible ? '1' : '0', height: figVisible ? '591px': '0'}} />
            </div>
        </>
    )
}