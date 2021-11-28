import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import { yellow, pink } from '@mui/material/colors';
import Box from '@mui/material/Box';
import AppHeader from './ui/AppHeader';
import AppFooter from './ui/AppFooter';
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
        <Box
          sx={{
            minHeight: '100vh', // 100% da altura da área de exibição
            backgroundColor: customTheme.palette.background.default,
            color: customTheme.palette.text.primary,
          }}
        >
          <AppHeader />
          <Box component="main" sx={{ margin: '20px 20px 60px 20px' }}>
            <Routes>
              <Route path="/clientes" element={<ClientesList />} />
              <Route path="/clientes/new" element={<ClientesForm />} />
              {/* :id é um parâmetro da rota, que será substituído pelo id real do cliente */}
              <Route path="/clientes/:id" />
            </Routes>
          </Box>
          <AppFooter />
        </Box>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
