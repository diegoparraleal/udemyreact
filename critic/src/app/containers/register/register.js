import { Card, CardActions, CardContent, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { CRITIC_PALETTE } from 'app/themes/theme';
import React from 'react';
import styled from 'styled-components';
import clientImage from "../../images/restaurantClient.jpg"
import ownerImage from "../../images/restaurantOwner.jpg"

const StyledRegisterContainer = styled.div`
  h3{
    margin-top: 128px !important;
  }

  .crt-register-card{
      cursor: pointer;

      &:hover{
          box-shadow: ${CRITIC_PALETTE.secondary} 0px 0px 8px 0px;
      }

      h6 {
          width: 100%;
      }
  }
`;


function RegisterContainer(props) {
    return (
        <StyledRegisterContainer>
            <Typography variant="h3">Please select your role in the application</Typography>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                </Grid>
                <Grid item xs={4}>
                    <Card className="crt-register-card">
                        <CardContent>
                            <img src={clientImage} alt="clientImage" />
                        </CardContent>
                        <CardActions>
                            <Typography variant="subtitle1">I am a restaurant customer</Typography>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card className="crt-register-card">
                        <CardContent>
                            <img src={ownerImage} alt="ownerImage" />
                        </CardContent>
                        <CardActions>
                            <Typography variant="subtitle1">I am a restaurant owner</Typography>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={2}>
                </Grid>
            </Grid>
        </StyledRegisterContainer>
    );
}

export default RegisterContainer;