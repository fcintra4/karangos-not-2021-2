import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import AppHeader from './ui/AppHeader'
import AppFooter from './ui/AppFooter'
import { createTheme, ThemeProvider } from '@mui/material';
import { yellow, pink } from '@mui/material/colors';
import Box from '@mui/material/Box'

import ClientesList from './routed/ClientesList'
import ClientesForm from './routed/ClientesForm'
<<<<<<< HEAD
import KarangosList from './routed/KarangosList';
=======
>>>>>>> f3f3ffbad57f0ead00be23d3b67ea0af3456f7e0

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
<<<<<<< HEAD
        <Box sx={{
          minHeight: '100vh', // 100% da altura da área de exibição
=======
        <Box sx={{ 
          minHeight: '100vh', // 100% da altura da área de exibição
          marginBottom: '40px',
>>>>>>> f3f3ffbad57f0ead00be23d3b67ea0af3456f7e0
          backgroundColor: customTheme.palette.background.default,
          color: customTheme.palette.text.primary
        }}>
          <AppHeader />
<<<<<<< HEAD
          <Box component="main" sx={{ margin: '20px 20px 60px 20px' }}>
            <Switch>

=======
          <Box component="main" sx={{ margin: '20px'}}>
            <Switch>
                          
>>>>>>> f3f3ffbad57f0ead00be23d3b67ea0af3456f7e0
              {/* Rota para o componente de listagem */}
              <Route path="/clientes" exact>
                <ClientesList />
              </Route>

              {/* Rota para o componente de formulário, para cadastrar novo cliente */}
              <Route path="/clientes/new" exact>
                <ClientesForm />
              </Route>

              {/* Rota para o componente de formulário, para editar um cliente existente.
               :id é um PARÂMETRO da rota, que será substituído pelo id real do cliente. */}
              <Route path="/clientes/:id">
                <ClientesForm />
              </Route>

<<<<<<< HEAD
              {/* Rota para o componente de listagem de veículos */}
              <Route path="/karangos" exact>
                <KarangosList />
              </Route>

            </Switch>
          </Box>

=======
            </Switch>
          </Box>
          
>>>>>>> f3f3ffbad57f0ead00be23d3b67ea0af3456f7e0
          <AppFooter />
        </Box>
      </ThemeProvider>
    </BrowserRouter>
  );
}

<<<<<<< HEAD
export default App;
=======
export default App;
>>>>>>> f3f3ffbad57f0ead00be23d3b67ea0af3456f7e0
