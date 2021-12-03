import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import AppHeader from './ui/AppHeader'
import AppFooter from './ui/AppFooter'
import { createTheme, ThemeProvider } from '@mui/material';
import { blue, blueGrey } from '@mui/material/colors';
import Box from '@mui/material/Box'

import PatrimonioList from './routed/PatrimonioList'
import PatrimonioForm from './routed/PatrimonioForm'
import Startpage from './routed/Startpage';

// Lucas Gomide Pavão

const customTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: blue[900]
    },
    secondary: {
      main: blueGrey[900]
    }
  }
})

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={customTheme}>
        <Box sx={{
          minHeight: '100vh', // 100% da altura da area de exibição
          marginBottom: '40px',
          backgroundColor: customTheme.palette.background.default,
          color: customTheme.palette.text.primary
        }}>
          <AppHeader />
          <Box component="main" sx={{ margin: '20px'}}>
            <Switch>

                {/* Rota para a Startpage. */}
                <Route path="/" exact>
                  <Startpage />
                </Route>

                {/* Rota para o componente de listagem. */}
                <Route path="/equipamentos" exact>
                  <PatrimonioList />
                </Route>

                {/* 
                <Route path="/karangos" exact>
                  <KarangosList />
                </Route>
                */}

                {/* Rota para o componente de listagem, para cadastrar novo cliente. */}
                <Route path="/equipamento/novo">
                  <PatrimonioForm />
                </Route>

                {/* Rota para o componente de formulário, para editar um cliente existente.
                  :id é um parâmetro da rota, que será substituído pelo id real do cliente. */}
                <Route path="/equipamento/:id">
                  <PatrimonioForm />
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
