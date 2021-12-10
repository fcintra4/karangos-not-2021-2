import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import AppHeader from './ui/AppHeader'
import AppFooter from './ui/AppFooter'
import { createTheme, ThemeProvider } from '@mui/material';
import { yellow, pink } from '@mui/material/colors';
import Box from '@mui/material/Box'

import ClientesList from './routed/ClientesList'
import ClientesForm from './routed/ClientesForm'
import Startpage from './routed/Startpage'
import About from './routed/About'

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
          minHeight: '100vh', // 100% da altura da área de exibição
          marginBottom: '40px',
          backgroundColor: customTheme.palette.background.default,
          color: customTheme.palette.text.primary
        }}>
          <AppHeader />
          <Box component="main" sx={{ margin: '20px'}}>
            <Switch>

              {/*
                 3. Altere o arquivo "Apps.js" e adicione um novo Route, com o valor path="/". Assegure-se de que esse novo Route seja POSICIONADO ANTES de todos os outros. Faça com que o componente Startpage seja carregado pelo novo Route. Dessa forma, o componente será exibido logo no início.              
              */}
              <Route path="/" exact>
                <Startpage />
              </Route>

              <Route path="/about" exact>
                <About />
              </Route>
                          
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

            </Switch>
          </Box>
          
          <AppFooter />
        </Box>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
