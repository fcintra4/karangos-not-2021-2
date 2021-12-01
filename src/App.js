import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import AppHeader from './ui/AppHeader'
import AppFooter from './ui/AppFooter'
import { createTheme, ThemeProvider } from '@mui/material';
import { yellow, pink } from '@mui/material/colors';
import Box from '@mui/material/Box'

import ClientesList from './routed/ClientesList'
import ClientesForm from './routed/ClientesForm'
import KarangosList from './routed/KarangosList';
import StartPage from './routed/Startpage';

const customTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: yellow[500]
    },
    secondary: {
      main: pink[500]
    }
  }
})

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={customTheme}>
        <Box sx={{ 
          minHeight: '100vh',
          marginBottom: '40px',
          backgroundColor: customTheme.palette.background.default,
          color: customTheme.palette.text.primary
        }}>


          <AppHeader />

          <Box component="main" sx={{ margin: '20px'}}>
            <Switch>

              {/* Rota para o componente de página inicial*/}
              <Route path="/" exact>
                <StartPage />
              </Route>

              {/* Rota para o componente de listagem de clientes*/}
              <Route path="/clientes" exact>
                <ClientesList />
              </Route>

              {/* Rota para o componente de listagem de karangos */}
              <Route path="/karangos" exact>
                <KarangosList />
              </Route>  

              {/* Rota para o componente de formulário, para cadastrar novo cliente */}
              <Route path="/clientes/new">
                <ClientesForm />
              </Route>

              {/* Rota para o componente de formulário, para editar um cliente existente.
                :id é um PARÂMETO da rota, que será substituído pelo id real do cliente  */}
              <Route path="/clientes/:id">
                <ClientesForm />
              </Route>

            </Switch>
          </Box>
          
          <AppFooter />

        </Box>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;