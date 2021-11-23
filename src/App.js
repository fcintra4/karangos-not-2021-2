import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import AppHeader from './ui/AppHeader'
import AppFooter from './ui/AppFooter'
import { createTheme, ThemeProvider } from '@mui/material';
import { yellow, pink } from '@mui/material/colors';
import Box from '@mui/material/Box'



import ClientesList from './routed/ClientesList'
import ClientesForm from './routed/ClientesForm'

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
          minHeight: '100vh', //100% da altura da área de exibição.
          marginBottom: '40px',
          backgroundColor: customTheme.palette.background.default,
          color: customTheme.palette.text.primary
        }}>

          <AppHeader />
          <Box componnet="main" sx={{
            margin: '20px'
          }}>
            <Switch>

              {/* Rota para o componente de listagem. */}
              <Route path="/clientes" exact>
                <ClientesList />
              </Route>

              {/* Rota para o componente de formulário, para cadadstrar novo cliente. */}
              <Route path="/clientes/new" exact>
                <ClientesForm />
              </Route>

              {/* Rota para o componente de formulário, para editar um cliente existente
               :id é um parâmetro da rota, que será substituido pelo id real do cliente. */ }
              <Route path="/clientes/:id" >
                <ClientesForm />
              </Route>
            </Switch>
          </Box>


          <AppFooter />
        </Box>
      </ThemeProvider>
    </BrowserRouter >
  );
}

export default App;
