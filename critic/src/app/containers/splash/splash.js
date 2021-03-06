import { Button, Typography } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import homeImage from '../../images/home-image.jpg'
import { useHistory } from 'react-router';
import useCriticGoogleLogin from 'app/hooks/useCriticGoogleLogin';

const StyledSplashContainer = styled.div`
    h3 {
        font-size: 24px;
        text-align: center;
        padding: 8px 0px;
        margin: 32px 64px;
        font-weight: 300;
        display: block;
    }

    > img {
        width: 100%;
    }

    > button{
        margin: 32px 64px;
        padding: 8px 16px;
        color: white;
    }
`;

function SplashContainer() {
    let history = useHistory();
    const {signIn} = useCriticGoogleLogin({
        onUserFound: () => history.push("/restaurants"),
        onUserNotFound: () => history.push("/register"),
    })

    return (
        <StyledSplashContainer>
            <Typography variant="h3">Welcome to critic, the leading world site for restaurant reviews!</Typography>
            <img src={homeImage} alt="homeImage" />
            <Button variant="contained" color="primary" onClick={signIn}>LOGIN</Button>
        </StyledSplashContainer>
    );
}

export default SplashContainer;