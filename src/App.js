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

          <Switch>

            <Box compoente="main" sx={{margin: '20px 20px 60px 20px'}}>
              <Route path ="/clientes" exact>
                <ClientesList/>
              </Route>

              <Route path ="/clientes/new">
                <ClientesForm/>
              </Route>
            </Box>

          </Switch> 

          <AppFooter/>

        </Box>

      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
