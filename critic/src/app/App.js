import { ThemeProvider } from "@material-ui/core";
import { GlobalStyles } from "globalStyles";
import React from "react";
import AppMain from "./containers/main/main";
import { CRITIC_THEME } from "./themes/theme";
import {BrowserRouter as Router} from "react-router-dom";
import { CriticStoreProvider } from "./store/store";


function App() {
  return (
    <ThemeProvider theme={CRITIC_THEME}>
      <Router>
        <CriticStoreProvider>
          <AppMain/>
          <GlobalStyles/>
        </CriticStoreProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
