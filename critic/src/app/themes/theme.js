import { createMuiTheme } from '@material-ui/core/styles';

export const CRITIC_PALETTE = {
    primary: '#003433',
    secondary: '#ff5b33',
    light: '#c6d9b4'
}

export const CRITIC_THEME = createMuiTheme({
  palette: {
    primary: {
      main: CRITIC_PALETTE.primary,
    },
    secondary: {
      main: CRITIC_PALETTE.secondary,
    },
  },
});
