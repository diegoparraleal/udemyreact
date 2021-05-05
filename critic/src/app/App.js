import { ThemeProvider } from "@material-ui/core";
import { GlobalStyles } from "globalStyles";
import React from "react";
import AppMain from "./containers/main/main";
import { CRITIC_THEME } from "./themes/theme";
import {BrowserRouter as Router} from "react-router-dom";
import { CriticStoreProvider } from "./store/store";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';


function App() {
  return (
    <ThemeProvider theme={CRITIC_THEME}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Router>
          <CriticStoreProvider>
            <AppMain/>
            <GlobalStyles/>
          </CriticStoreProvider>
        </Router>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
}

export default App;
