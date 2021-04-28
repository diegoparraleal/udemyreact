import { ThemeProvider } from "@material-ui/core";
import { GlobalStyles } from "globalStyles";
import React from "react";
import AppMain from "./containers/main/main";
import { CRITIC_THEME } from "./themes/theme";

function App() {
  return (
    <ThemeProvider theme={CRITIC_THEME}>
      <AppMain/>
      <GlobalStyles/>
    </ThemeProvider>
  );
}

export default App;
