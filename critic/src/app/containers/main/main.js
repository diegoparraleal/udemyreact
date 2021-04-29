import AppFooter from "./app.footer";
import AppHeader from "./app.header";
import styled from 'styled-components'
import React, { useState } from "react";
import { useGoogleLogout } from "react-google-login";
import { GOOGLE_CLIENT_ID } from "env";
import { Route, Switch, useHistory } from "react-router-dom";
import RegisterContainer from "../register/register";
import SplashContainer from "../splash/splash";

const StyledAppMain = styled.div`
    width: 1024px;
    height: 100%;
    margin: 0 auto;
    text-align: center;
    display: flex;
    flex-direction: column;

    .crt-content {
        flex-grow: 1;

        h3 {
            font-size: 24px;
            text-align: center;
            padding: 8px 0px;
            margin: 32px 64px;
            font-weight: 300;
            display: block;
        }

        ul {
           list-style: none;
           li {
               display: inline;
           } 
        }

        img {
            width: 100%;
        }

        button{
            margin: 32px 64px;
            padding: 8px 16px;
            color: white;
        }
    }

`

function AppMain(){
    const [user, setUser] = useState({});
    let history = useHistory();

    const onLogoutSuccess = (res) => {
        console.log(res);
        setUser({})
        history.push("/")
    }

    const onFailure = (res) => {
        console.log(res);
    }

    const { signOut } = useGoogleLogout({
        onFailure,
        clientId: GOOGLE_CLIENT_ID,
        onLogoutSuccess
    })
    

    const logoClicked = () => console.log("SE HIZO CLICK EN EL LOGO");
    
    return (
    <StyledAppMain>
        <AppHeader  user={user} onLogoClick={logoClicked} showLogo={true} onLogoff={signOut} />
        <div className="crt-content">
            <Switch>
                <Route path="/register">
                    <RegisterContainer />
                </Route>
                <Route path="/">
                    <SplashContainer onUserChanged={setUser} />        
                </Route>
            </Switch>
        </div>
        <AppFooter />
    </StyledAppMain>)
}

export default AppMain;