import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import AppHeader  from './ui/AppHeader';
import AppFooter from './ui/AppFooter';
import { createTheme, ThemeProvider } from '@mui/material';
import { yellow, pink } from '@mui/material/colors';
import ClientList from './routed/ClientList';
import ClientsForm from './routed/ClientsForm';
import KarangosList from './routed/KarangosList';
import KarangosForm from './routed/KarangosForm';
import Box  from '@mui/material/Box';

const customTheme = createTheme({
  palette:{
    mode: 'dark',
    primary:{
      main:yellow[500]
    },
    secondary: {
      main: pink[500]
    }
  }
});

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={customTheme}>
        <Box sx={{
          minHeight: '100vh',
          backgroundColor: customTheme.palette.background.default,
          color: customTheme.palette.text.primary
        }}>
          <AppHeader bgcolor={customTheme.palette.primary.main}/>
          <Box component="main" sx={{margin: '20px'}}>
            <Switch>
              

                <Route path="/clientes" exact>
                  <ClientList />
                </Route>

                <Route path="/clientes/new">
                  <ClientsForm />
                </Route>

                <Route path="/clientes/:id">
                  <ClientsForm />
                </Route>

                <Route path="/karangos" exact>
                  <KarangosList />
                </Route>

                <Route path="/karangos/new">
                  <KarangosForm />
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
