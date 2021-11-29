import './App.css';
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import AppHeader from './ui/AppHeader'
import AppFooter from './ui/AppFooter'
import { createTheme, ThemeProvider } from '@mui/material';
import { yellow, pink } from '@mui/material/colors';
import Box from '@mui/material/Box'

import ClientesList from './routed/ClientesList'
import ClientesForm from './routed/ClientesForm'
import KarangosList from './routed/KarangosList'
import KarangosForm from './routed/KarangosForm';

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
        <Box sx={{ minHeight: '100vh', // 10% da altura da área de exibição
        backgroundColor: customTheme.palette.background.default,
        color: customTheme.palette.text.primary
        }}>
          <AppHeader />
            <Switch>
              <Box component="main" sx={{ margin: '20px 20px 60px 20px'}}>
                
                {/* Rota para o componente de listagem */}
                <Route path="/clientes" exact>
                  <ClientesList />
                </Route>

                {/* Rota para cadastrar novo cliente */}
                <Route path="/clientes/new">
                  <ClientesForm />
                </Route>

                {/* Rota para editar cliente existente
                :id e um Parâmetro da rota, que sera ubstituído pelo id real do cliente */}
                <Route path="/clientes/:id">
                  <ClientesForm />
                </Route>

                {/* rota para lista de carros */}
                <Route path="/karangos" exact>
                  <KarangosList />
                </Route>

                {/* Rota para cadastrar novo carro */}
                <Route path="/karangos/new">
                  <KarangosForm />
                </Route>

              </Box>
            </Switch>
          <AppFooter />
        </Box>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
