import AppFooter from "./app.footer";
import AppHeader from "./app.header";
import styled from 'styled-components'
import homeImage from '../../images/home-image.jpg'
import { useEffect, useState } from "react";
import { apiService } from "../../services/apiService";
import { Button, Typography } from "@material-ui/core";
import React from "react";
import { useGoogleLogin, useGoogleLogout } from "react-google-login";
import { GOOGLE_CLIENT_ID } from "env";

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

    const onSuccess = (res) => {
        console.log(res);
        setUser(res.profileObj)
    }

    const onLogoutSuccess = (res) => {
        console.log(res);
        setUser({})
    }

    const onFailure = (res) => {
        console.log(res);
    }

    const { signIn } = useGoogleLogin({
        onSuccess,
        clientId: GOOGLE_CLIENT_ID,
        onFailure
    })

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
            <Typography variant="h3">Welcome to critic, the leading world site for restaurant reviews!</Typography>
            <img src={homeImage} alt="homeImage" />
            <Button variant="contained" color="primary" onClick={signIn}>LOGIN</Button>
        </div>
        <AppFooter />
    </StyledAppMain>)
}

export default AppMain;