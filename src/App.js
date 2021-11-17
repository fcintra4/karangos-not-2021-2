import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import AppHeader from './UI/AppHeader';
import { createTheme, ThemeProvider } from '@mui/material';
import { yellow, pink } from '@mui/material/colors';
import ClientesList from './routed/ClientesList'
import ClientesForm from './routed/ClientesForm'
import AppFooter from './UI/AppFooter';
import Box from '@mui/material/Box'

const customTheme = createTheme ({
  palette:{
    primary: {
      main: yellow[500]
    },
    secondary:{
      main: pink[500]
    },
    mode: 'dark',
  }
})

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={customTheme}>

        <Box sx={{ 
            minHeight : '100vh', //100% da altura da área de exibição
            backgroundColor:customTheme.palette.background.default,
            color: customTheme.palette.text.primary
          }}>

          <AppHeader/>

          <Box compoente="main" sx={{margin: '20px 20px 60px 20px'}}>
            <Switch>
       

              {/*Rota para o coponente de listagem*/}
              <Route path ="/clientes" exact>
                <ClientesList/>
              </Route>
              {/*Rota para o componente de formulário, para cadastrar novo cliente */}
              <Route path ="/clientes/new" exact>
                <ClientesForm/>
              </Route>
              {/*Rota para o componente de formulário, para editar um cliente existente 
              :id é um PARÂMETRO da rota, que será substituído pelo id do cliente*/}
              <Route path ="/clientes/:id">
                <ClientesForm/>
              </Route>

            </Switch> 
          </Box>

          

          <AppFooter/>

          </Box>

      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
