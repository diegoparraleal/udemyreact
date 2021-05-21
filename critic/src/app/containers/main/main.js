import AppFooter from "./app.footer";
import AppHeader from "./app.header";
import styled from 'styled-components'
import React from "react";
import { Route, Switch } from "react-router-dom";
import RegisterContainer from "../register/register";
import SplashContainer from "../splash/splash";
import RestaurantsContainer from "../restaurants/restaurants";
import RestaurantDetailContainer from "../restaurant.detail/restaurant.detail";
import useCriticGoogleLogin from "app/hooks/useCriticGoogleLogin";
import ReviewsContainer from "../reviews/reviews";

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

        > button{
            margin: 32px 64px;
            padding: 8px 16px;
            color: white;
        }
    }

`

function AppMain(){
    useCriticGoogleLogin({})
    const logoClicked = () => console.log("SE HIZO CLICK EN EL LOGO");
    
    return (
    <StyledAppMain>
        <AppHeader onLogoClick={logoClicked} showLogo={true} />
        <div className="crt-content">
            <Switch>
                <Route path="/reviews">
                    <ReviewsContainer />
                </Route>
                <Route path="/restaurants/:id">
                    <RestaurantDetailContainer />
                </Route>
                <Route path="/restaurants">
                    <RestaurantsContainer />
                </Route>
                <Route path="/register">
                    <RegisterContainer  />
                </Route>
                <Route path="/">
                    <SplashContainer />        
                </Route>
            </Switch>
        </div>
        <AppFooter />
    </StyledAppMain>)
}

export default AppMain;