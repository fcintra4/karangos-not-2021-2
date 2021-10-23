import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import AppHeader from './ui/AppHeader';
import { createTheme, ThemeProvider } from '@mui/material';
import { yellow, pink } from '@mui/material/colors';

import ClientesList from './routed/ClientesList';
import ClientesForm from './routed/ClientesForm';

const customTheme = createTheme({
  palette: {
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
      <AppHeader />
    </ThemeProvider>
   </BrowserRouter>
  );
}

export default App;
