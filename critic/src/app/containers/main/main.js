import AppFooter from "./app.footer";
import AppHeader from "./app.header";
import styled from 'styled-components'
import React, { useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import RegisterContainer from "../register/register";
import SplashContainer from "../splash/splash";
import RestaurantsContainer from "../restaurants/restaurants";
import RestaurantDetailContainer from "../restaurant.detail/restaurant.detail";
import useCriticGoogleLogin from "app/hooks/useCriticGoogleLogin";
import ReviewsContainer from "../reviews/reviews";
import UsersContainer from "../users/users";
import { CriticStore } from "app/store/store";

const StyledAppMain = styled.div`
    width: 1024px;
    height: 100%;
    margin: 0 auto;
    text-align: center;
    display: flex;
    flex-direction: column;

    .crt-content {
        flex-grow: 1;
    }
`

function AppMain(){
    const {state} = useContext(CriticStore);
    const {googleUser, appUser} = state;

    useCriticGoogleLogin({})
    const logoClicked = () => console.log("SE HIZO CLICK EN EL LOGO");
    
    return (
    <StyledAppMain>
        <AppHeader onLogoClick={logoClicked} showLogo={true} />
        <div className="crt-content">
            <Switch>
                <Route path="/users">
                    {appUser ? <UsersContainer /> : <Redirect to='/' />}
                </Route>
                <Route path="/reviews">
                    {appUser ? <ReviewsContainer /> : <Redirect to='/' />}
                </Route>
                <Route path="/restaurants/:id">
                    {appUser ? <RestaurantDetailContainer /> : <Redirect to='/' />}
                </Route>
                <Route path="/restaurants">
                    {appUser ? <RestaurantsContainer /> : <Redirect to='/' />}
                </Route>
                <Route path="/register">
                    {googleUser ? <RegisterContainer /> : <Redirect to='/' />}
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