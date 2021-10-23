
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material';
import { yellow, pink } from '@mui/material/colors';

import AppHeader from './ui/AppHeader'
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
        <AppHeader/>
        <Switch>
          <Route path="/clientes" exact>
            <ClientesList />
          </Route>
          <Route path="/clientes/new">
            <ClientesForm />
          </Route>
        </Switch>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
