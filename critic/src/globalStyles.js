import { CRITIC_PALETTE } from "app/themes/theme";
import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    html, body, #root {
      height: 100%;
      width: 100%;
      margin: 0;
    }

    .crt-border{
      border: 1px solid #eeeeee;

      &:hover{
        box-shadow: 0 0 2px 2px ${CRITIC_PALETTE.light};
      }
    }
`