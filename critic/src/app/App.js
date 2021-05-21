import { ThemeProvider } from "@material-ui/core";
import { GlobalStyles } from "globalStyles";
import React from "react";
import AppMain from "./containers/main/main";
import { CRITIC_THEME } from "./themes/theme";
import {BrowserRouter as Router} from "react-router-dom";
import { CriticStoreProvider } from "./store/store";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import useScript from "./hooks/useScript";
import { GOOGLE_API_KEY } from "env";


function App() {
  useScript(`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`)
  
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
