import { Button, Typography } from '@material-ui/core';
import { GOOGLE_CLIENT_ID } from 'env';
import React from 'react';
import styled from 'styled-components';
import homeImage from '../../images/home-image.jpg'
import { useGoogleLogin } from "react-google-login";
import { useHistory } from 'react-router';

const StyledSplashContainer = styled.div`
  
`;

function SplashContainer({onUserChanged}) {
    let history = useHistory();

    const onSuccess = (res) => {
        console.log(res);
        onUserChanged(res.profileObj)
        history.push("/register")
    }

    const onFailure = (res) => {
        console.log(res);
    }

    const { signIn } = useGoogleLogin({
        onSuccess,
        clientId: GOOGLE_CLIENT_ID,
        onFailure
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