import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {Provider} from "react-redux";
import {BrowserRouter as Router} from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import {ThemeProvider} from "@mui/material/styles";
import {AuthProvider} from "./contexts/AuthContext";
import {store} from "./redux/store";
import theme from "./theme";
import App from "./App";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./index.css";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Router>
            <CssBaseline />

            <App />
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
