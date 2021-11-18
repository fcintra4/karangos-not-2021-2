import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import { yellow, pink } from '@mui/material/colors';
import AppHeader from './ui/AppHeader';
import ClientesList from './routed/ClientesList';
import ClientesForm from './routed/ClientesForm';

const customTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: yellow[500],
    },
    secondary: {
      main: pink[500],
    },
  },
});

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={customTheme}>
        <AppHeader />
        <Routes>
          <Route path="/clientes" element={<ClientesList />} exact />
          <Route path="/clientes/new" element={<ClientesForm />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
