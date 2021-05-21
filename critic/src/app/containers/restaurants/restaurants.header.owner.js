import React from 'react';
import styled from 'styled-components';
import BusinessIcon from '@material-ui/icons/Business';
import { Button, Grid, Typography } from '@material-ui/core';
import { CRITIC_PALETTE } from 'app/themes/theme';

const StyledRestaurantHeaderOwner = styled.div`
  margin: 32px 0;
  height: 64px;
  position: relative;

  h4{
     text-align: left; 
     line-height: 64px;
  }
  
  .crt-addRestaurant{
    color: ${CRITIC_PALETTE.light};

    h5{
      margin-left: 8px;
      cursor: pointer;
    }
  } 
`

function RestaurantsHeaderOwner({onAddRestaurantClick}) {

    return (
        <StyledRestaurantHeaderOwner>
            <Grid container>
                <Grid item xs={9}>
                    <Typography variant="h4" component="h4" className="crt-label-title">My restaurants</Typography>
                </Grid>
                <Grid item xs={3}>
                    <Button variant="contained" color="primary" className="crt-addRestaurant"  onClick={onAddRestaurantClick} >
                        <BusinessIcon/>
                        <Typography component="h5">Add Restaurant</Typography>
                    </Button>
                </Grid>
            </Grid>
        </StyledRestaurantHeaderOwner>
    )
}

export default RestaurantsHeaderOwner