import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import AppHeader  from './ui/AppHeader';
import { createTheme, ThemeProvider } from '@mui/material';
import { yellow, pink } from '@mui/material/colors';
import ClientList from './routed/ClientList';
import ClientsForm from './routed/ClientsForm';

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
        <AppHeader bgcolor={customTheme.palette.primary.main}/>
        <Switch>
          <Route path="/clientes" exact>
            <ClientList />
          </Route>
          <Route path="/clientes/new">
            <ClientsForm />
          </Route>
        </Switch>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
