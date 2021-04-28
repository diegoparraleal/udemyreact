import { AppBar, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components'

const StyledAppFooter = styled.div`
    width: 100%;
    height: 64px;


    
    h6 {
        text-align: center;
        font-size: 12px;
        display: inline-block;
        width: 100%;
    }
`

function AppFooter() {
    return (
        <StyledAppFooter>
            <AppBar position="relative">
                <Toolbar>
                    <Typography variant="h6">Copyright diego.parra.leal@gmail.com - 2021</Typography>
                </Toolbar>
            </AppBar>
        </StyledAppFooter>
    );
}
  
export default AppFooter;
  