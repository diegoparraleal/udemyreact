import { Button, Typography } from '@material-ui/core';
import { GOOGLE_CLIENT_ID } from 'env';
import React, { useContext } from 'react';
import styled from 'styled-components';
import homeImage from '../../images/home-image.jpg'
import { useGoogleLogin } from "react-google-login";
import { useHistory } from 'react-router';
import { apiService } from 'app/services/apiService';
import { CriticDispatchers, CriticStore } from 'app/store/store';

const StyledSplashContainer = styled.div`
  
`;

function SplashContainer() {
    const {state, dispatch} = useContext(CriticStore)
    let history = useHistory();

    const onSuccess = (res) => {
        console.log(res);
        dispatch(CriticDispatchers.login(res.profileObj))
        checkIfUserExists(res.profileObj.email)
    }

    const onFailure = (res) => {
        console.log(res);
    }

    const { signIn } = useGoogleLogin({
        onSuccess,
        clientId: GOOGLE_CLIENT_ID,
        onFailure
    })

    const checkIfUserExists = (email) => {
        apiService.getAppUserByEmail(email)
                  .then((appUser) => {
                      dispatch(CriticDispatchers.setAppUser(appUser))
                      history.push("/restaurants")
                  })
                  .catch(() => history.push("/register"))
    }

    return (
        <StyledSplashContainer>
            <Typography variant="h3">Welcome to critic, the leading world site for restaurant reviews!</Typography>
            <img src={homeImage} alt="homeImage" />
            <Button variant="contained" color="primary" onClick={signIn}>LOGIN</Button>
        </StyledSplashContainer>
    );
}

export default SplashContainer;