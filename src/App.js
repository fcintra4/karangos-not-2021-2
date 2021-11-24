import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import { yellow, pink } from "@mui/material/colors";

import AppHeader from "./ui/AppHeader";
import AppFooter from "./ui/AppFooter";
import ClientesList from "./routed/ClientesList";
import ClientesForm from "./routed/ClientesForm";
import Box from "@mui/material/Box";
import KarangosList from "./routed/KarangosList";
import KarangosForm from "./routed/KarangosForm";

const customTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: yellow[200],
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
            minHeight: '100vh', //100% daaltura da área de exibição
            marginBottom: '40px',
            backgroundColor: customTheme.palette.background.default,
            color: customTheme.palette.text.primary
          }}
        >
          <AppHeader />
          <Box component="main" sx={{ margin: "20px" }}>
          <Switch>

              <Route path="/clientes" exact>
                <ClientesList />
              </Route>
              <Route path="/clientes/new" exact>
                <ClientesForm />
              </Route>
              {/* rota parametrizada*/}
              <Route path="/clientes/:id" >
                <ClientesForm />
              </Route>
              <Route path="/karangos" exact>
                <KarangosList />
              </Route>
              <Route path="/karangos/new" exact>
                <KarangosForm />
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
