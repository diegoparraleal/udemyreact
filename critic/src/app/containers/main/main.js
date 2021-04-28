import AppFooter from "./app.footer";
import AppHeader from "./app.header";
import styled from 'styled-components'
import homeImage from '../../images/home-image.jpg'
import { useEffect, useState } from "react";
import { apiService } from "../../services/apiService";
import { Button, Typography } from "@material-ui/core";
import React from "react";

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
    const [userEmail, setUserEmail] = useState("");
    const [count, setCount] = useState(0);

    const logoClicked = () => console.log("SE HIZO CLICK EN EL LOGO");
    
    const changeUser = () => {
        setCount(count + 1)
        if (count % 2 === 0)
            setUserEmail("rachel.green@fakegmail.com");
        else
            setUserEmail("ross.geller@fakegmail.com");
    }

    useEffect( () => {
        if (userEmail === "") return;
        apiService.getUserByEmail(userEmail).then( appUser => setUser(appUser) )
    }, [userEmail])

    return (
    <StyledAppMain>
        <AppHeader  user={user} onLogoClick={logoClicked} showLogo={true} />
        <div className="crt-content">
            <Typography variant="h3">Welcome to critic, the leading world site for restaurant reviews!</Typography>
            <img src={homeImage} alt="homeImage" />
            <Button variant="contained" color="primary" onClick={changeUser}>LOGIN</Button>
        </div>
        <AppFooter />
    </StyledAppMain>)
}

export default AppMain;